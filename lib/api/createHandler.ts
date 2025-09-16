import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema } from 'zod';

export interface RouteContext {
  params?: Record<string, string>;
}

export interface ApiError {
  error: string;
  details?: unknown;
  statusCode: number;
}

export class ApiResponse {
  static success<T>(data: T, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
  }

  static error(message: string, status = 400, details?: unknown) {
    return NextResponse.json(
      { success: false, error: message, details },
      { status }
    );
  }
}

export function createHandler(
  handler: (req: NextRequest, context?: RouteContext) => Promise<NextResponse>,
  options?: {
    schema?: ZodSchema;
    requireAuth?: boolean;
  }
) {
  return async (req: NextRequest, context?: RouteContext) => {
    try {
      if (options?.schema) {
        const body = await req.json();
        const validation = options.schema.safeParse(body);

        if (!validation.success) {
          return ApiResponse.error(
            'Validation error',
            400,
            validation.error.issues
          );
        }
      }

      if (options?.requireAuth) {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
          return ApiResponse.error('Unauthorized', 401);
        }
      }

      const response = await handler(req, context || {});
      return response;
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof Error) {
        return ApiResponse.error(error.message, 500);
      }

      return ApiResponse.error('Internal server error', 500);
    }
  };
}