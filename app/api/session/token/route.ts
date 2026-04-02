import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function POST(req: NextRequest) {
  const { roomName, participantName, role } = await req.json();

  if (!roomName || !participantName) {
    return NextResponse.json(
      { success: false, error: 'roomName and participantName are required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { success: false, error: 'LiveKit credentials not configured' },
      { status: 500 }
    );
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    name: participantName,
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    roomAdmin: role === 'tutor',
  });

  const jwt = await token.toJwt();

  return NextResponse.json({ success: true, token: jwt });
}
