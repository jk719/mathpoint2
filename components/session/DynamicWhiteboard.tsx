'use client';

import dynamic from 'next/dynamic';
import type { Room } from 'livekit-client';

const ExcalidrawWhiteboard = dynamic(
  () =>
    import('./ExcalidrawWhiteboard').then((mod) => ({
      default: mod.ExcalidrawWhiteboard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#ff6b35] rounded-full animate-spin" />
          <span className="text-sm">Loading whiteboard...</span>
        </div>
      </div>
    ),
  }
);

interface DynamicWhiteboardProps {
  room?: Room;
  participantName: string;
}

export function DynamicWhiteboard({ room, participantName }: DynamicWhiteboardProps) {
  return <ExcalidrawWhiteboard room={room} participantName={participantName} />;
}
