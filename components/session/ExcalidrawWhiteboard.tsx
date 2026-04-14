'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { ConnectionState } from 'livekit-client';
import type { Room } from 'livekit-client';

interface ExcalidrawWhiteboardProps {
  room?: Room;
  participantName: string;
}

// Throttle sync to avoid flooding the data channel
const SYNC_THROTTLE_MS = 100;

export function ExcalidrawWhiteboard({ room, participantName }: ExcalidrawWhiteboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiRef = useRef<any>(null);
  const lastSyncRef = useRef<number>(0);
  const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRemoteUpdateRef = useRef(false);
  const participantIdRef = useRef(`${participantName}-${Date.now()}`);

  // Broadcast scene data to other participants
  const broadcastScene = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (elements: readonly any[]) => {
      if (!room?.localParticipant || room.state !== ConnectionState.Connected) return;

      const payload = {
        type: 'excalidraw-scene',
        elements,
        senderId: participantIdRef.current,
      };

      const encoded = new TextEncoder().encode(JSON.stringify(payload));
      room.localParticipant.publishData(encoded, { reliable: true });
    },
    [room]
  );

  // Handle local changes — throttled broadcast
  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (elements: readonly any[], _appState: any, _files: any) => {
      // Skip if this change came from a remote update
      if (isRemoteUpdateRef.current) {
        isRemoteUpdateRef.current = false;
        return;
      }

      const now = Date.now();
      const elapsed = now - lastSyncRef.current;

      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }

      if (elapsed >= SYNC_THROTTLE_MS) {
        lastSyncRef.current = now;
        broadcastScene(elements);
      } else {
        // Schedule a trailing sync
        throttleTimerRef.current = setTimeout(() => {
          lastSyncRef.current = Date.now();
          broadcastScene(elements);
          throttleTimerRef.current = null;
        }, SYNC_THROTTLE_MS - elapsed);
      }
    },
    [broadcastScene]
  );

  // Listen for incoming scene updates from other participants
  useEffect(() => {
    if (!room) return;

    const handleData = (payload: Uint8Array) => {
      const text = new TextDecoder().decode(payload);
      try {
        const data = JSON.parse(text);
        if (
          data.type === 'excalidraw-scene' &&
          data.senderId !== participantIdRef.current &&
          apiRef.current
        ) {
          isRemoteUpdateRef.current = true;
          apiRef.current.updateScene({ elements: data.elements });
        }
      } catch {
        // Not an Excalidraw message
      }
    };

    room.on('dataReceived', handleData);
    return () => {
      room.off('dataReceived', handleData);
    };
  }, [room]);

  // Cleanup throttle timer
  useEffect(() => {
    return () => {
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-200">
      <div className="flex-1" style={{ minHeight: 0 }}>
        <Excalidraw
          excalidrawAPI={(api: unknown) => {
            apiRef.current = api;
          }}
          onChange={handleChange}
          name="MathPoint Whiteboard"
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveToActiveFile: false,
              toggleTheme: false,
            },
          }}
          initialData={{
            appState: {
              viewBackgroundColor: '#f9fafb',
              gridSize: 20,
              currentItemFontFamily: 1,
            },
          }}
        />
      </div>
    </div>
  );
}
