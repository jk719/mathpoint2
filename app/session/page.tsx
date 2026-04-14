'use client';

import { Suspense, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  LiveKitRoom,
  VideoTrack,
  useTracks,
  useRoomContext,
  useLocalParticipant,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  PenTool,
  LogOut,
} from 'lucide-react';
import { DynamicWhiteboard } from '@/components/session/DynamicWhiteboard';
import { SessionChat } from '@/components/session/SessionChat';
import { useTranslation } from '@/lib/i18n/LanguageContext';

function SessionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const token = searchParams.get('token') ?? '';
  const roomName = searchParams.get('room') ?? '';
  const name = searchParams.get('name') ?? '';
  const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL ?? '';

  if (!token || !livekitUrl) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-lg mb-4">Missing session credentials</p>
          <button
            onClick={() => router.push('/session/join')}
            className="px-4 py-2 bg-[#ff6b35] rounded-lg hover:bg-[#e55a2a] transition-colors"
          >
            {t('session.joinSession')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={livekitUrl}
      token={token}
      connect={true}
      onDisconnected={() => {
        console.warn('[LiveKit] Disconnected from room');
        router.push('/session/join');
      }}
      onError={(err) => {
        console.error('[LiveKit] Connection error:', err);
      }}
      className="min-h-screen bg-gray-900"
    >
      <SessionLayout roomName={roomName} participantName={name} />
    </LiveKitRoom>
  );
}

function SessionLayout({ roomName, participantName }: { roomName: string; participantName: string }) {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const { t } = useTranslation();
  const router = useRouter();

  const [showWhiteboard, setShowWhiteboard] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const videoTracks = tracks.filter(
    (t) => t.source === Track.Source.Camera
  );

  const toggleMic = useCallback(async () => {
    await localParticipant.setMicrophoneEnabled(!micEnabled);
    setMicEnabled(!micEnabled);
  }, [localParticipant, micEnabled]);

  const toggleCam = useCallback(async () => {
    await localParticipant.setCameraEnabled(!camEnabled);
    setCamEnabled(!camEnabled);
  }, [localParticipant, camEnabled]);

  const leaveSession = useCallback(() => {
    room.disconnect();
    router.push('/session/join');
  }, [room, router]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white font-medium text-sm">{roomName}</span>
          <span className="text-gray-400 text-xs">
            {videoTracks.length} {t('session.participants')}
          </span>
        </div>
        <span className="text-xs text-gray-500">{t('session.title')}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video + Whiteboard area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-2 p-2">
          {/* Video Grid */}
          <div className={`${showWhiteboard ? 'lg:w-1/3' : 'w-full'} flex flex-col gap-2`}>
            {videoTracks.length === 0 ? (
              <div className="flex-1 bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">{t('session.waitingForParticipants')}</span>
              </div>
            ) : (
              videoTracks.map((track) => (
                <div
                  key={track.participant.sid}
                  className="flex-1 bg-gray-800 rounded-xl overflow-hidden relative"
                >
                  {track.publication?.track ? (
                    <VideoTrack
                      trackRef={track}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#1a3a52] flex items-center justify-center text-white text-2xl font-bold">
                        {track.participant.name?.[0]?.toUpperCase() ?? '?'}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-white text-xs">
                    {track.participant.name ?? 'Unknown'}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Whiteboard */}
          {showWhiteboard && (
            <div className="lg:w-2/3 min-h-[200px] sm:min-h-[300px]">
              <DynamicWhiteboard room={room} participantName={participantName} />
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        <SessionChat
          room={room}
          participantName={participantName}
          isOpen={showChat}
          onClose={() => setShowChat(false)}
        />
      </div>

      {/* Bottom control bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 py-3 bg-gray-800 border-t border-gray-700">
        <button
          onClick={toggleMic}
          className={`p-3 sm:p-3 min-w-[44px] min-h-[44px] rounded-full transition-colors flex items-center justify-center ${
            micEnabled ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          title={micEnabled ? 'Mute' : 'Unmute'}
        >
          {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleCam}
          className={`p-3 sm:p-3 min-w-[44px] min-h-[44px] rounded-full transition-colors flex items-center justify-center ${
            camEnabled ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          title={camEnabled ? 'Camera Off' : 'Camera On'}
        >
          {camEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setShowWhiteboard(!showWhiteboard)}
          className={`p-3 sm:p-3 min-w-[44px] min-h-[44px] rounded-full transition-colors flex items-center justify-center ${
            showWhiteboard ? 'bg-[#ff6b35] text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          title="Whiteboard"
        >
          <PenTool className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className={`p-3 sm:p-3 min-w-[44px] min-h-[44px] rounded-full transition-colors flex items-center justify-center ${
            showChat ? 'bg-[#ff6b35] text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          title="Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <div className="w-px h-8 bg-gray-600 mx-1 sm:mx-2" />

        <button
          onClick={leaveSession}
          className="p-3 sm:p-3 min-w-[44px] min-h-[44px] rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center"
          title="Leave"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function SessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading session...</div>
      </div>
    }>
      <SessionContent />
    </Suspense>
  );
}
