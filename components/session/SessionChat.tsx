'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import type { Room } from 'livekit-client';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMsg {
  sender: string;
  content: string;
  timestamp: number;
}

interface SessionChatProps {
  room?: Room;
  participantName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SessionChat({ room, participantName, isOpen, onClose }: SessionChatProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for incoming chat messages
  useEffect(() => {
    if (!room) return;

    const handleData = (payload: Uint8Array) => {
      const text = new TextDecoder().decode(payload);
      try {
        const data = JSON.parse(text);
        if (data.type === 'chat-msg') {
          setMessages((prev) => [...prev, data.msg]);
        }
      } catch {
        // Not a chat message
      }
    };

    room.on('dataReceived', handleData);
    return () => { room.off('dataReceived', handleData); };
  }, [room]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || !room?.localParticipant) return;

    const msg: ChatMsg = {
      sender: participantName,
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, msg]);
    setInput('');

    const encoded = new TextEncoder().encode(JSON.stringify({ type: 'chat-msg', msg }));
    room.localParticipant.publishData(encoded, { reliable: true });
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-80 bg-white border-l border-gray-200 flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span className="font-semibold text-gray-900 text-sm">Chat</span>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-xs text-gray-400 text-center mt-8">No messages yet</p>
            )}
            {messages.map((msg, i) => {
              const isMe = msg.sender === participantName;
              return (
                <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-xs font-medium text-gray-500">{msg.sender}</span>
                    <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${
                      isMe
                        ? 'bg-[#ff6b35] text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-[#ff6b35] text-white hover:bg-[#e55a2a] transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
