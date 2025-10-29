// Session storage for algebra1 adaptive diagnostic
// This is a simple in-memory store for demo purposes
// In production, use Redis or a database

import { AdaptiveDiagnosticSession } from '@/types/algebra1-diagnostic';

class SessionStore {
  private static instance: SessionStore;
  private sessions: Map<string, AdaptiveDiagnosticSession>;

  private constructor() {
    this.sessions = new Map();
  }

  static getInstance(): SessionStore {
    if (!SessionStore.instance) {
      SessionStore.instance = new SessionStore();
    }
    return SessionStore.instance;
  }

  get(sessionId: string): AdaptiveDiagnosticSession | undefined {
    return this.sessions.get(sessionId);
  }

  set(sessionId: string, session: AdaptiveDiagnosticSession): void {
    this.sessions.set(sessionId, session);
  }

  delete(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  has(sessionId: string): boolean {
    return this.sessions.has(sessionId);
  }

  clear(): void {
    this.sessions.clear();
  }

  // Clean up old sessions (older than 1 hour)
  cleanup(): void {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    for (const [id, session] of this.sessions) {
      if (session.startTime < oneHourAgo) {
        this.sessions.delete(id);
      }
    }
  }
}

// Export singleton instance
export const sessionStore = SessionStore.getInstance();