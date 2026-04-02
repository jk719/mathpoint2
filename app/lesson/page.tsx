'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { getDemoSkillById } from '@/data/demo-skills';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function LessonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, language } = useTranslation();
  const { diagnosticResult } = useDiagnosticStore();

  const skillId = searchParams.get('skill') ?? '';
  const skill = getDemoSkillById(skillId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const hasStartedRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getGreeting = useCallback((lang: string) => {
    if (!skill) return '';
    return lang === 'zh'
      ? `你好！让我们一起学习"${skill.displayName}"。根据你的诊断结果，这是一个可以提高的领域。你对这个技能了解多少？`
      : `Hi! Let's work on "${skill.displayName}". Based on your diagnostic, this is an area we can improve together. What do you already know about this skill?`;
  }, [skill]);

  // Send initial greeting when page loads
  useEffect(() => {
    if (!skill || hasStartedRef.current) return;
    hasStartedRef.current = true;
    setMessages([{ role: 'assistant', content: getGreeting(language) }]);
  }, [skill, language, getGreeting]);

  // Update greeting if language changes and only the greeting exists
  useEffect(() => {
    if (prevLanguageRef.current !== language && messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: getGreeting(language) }]);
    }
    prevLanguageRef.current = language;
  }, [language, messages, getGreeting]);

  const sendMessage = async (content: string) => {
    if (!skill || isStreaming) return;

    const userMessage: Message = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsStreaming(true);

    // Add empty assistant message for streaming
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          skillId: skill.id,
          skillName: skill.displayName,
          topic: skill.topic,
          difficulty: skill.difficulty,
          language,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Chat request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'assistant') {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + text,
            };
          }
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant' && !last.content) {
          updated[updated.length - 1] = {
            ...last,
            content: language === 'zh'
              ? '抱歉，出现了错误。请检查API密钥是否已设置，然后重试。'
              : 'Sorry, something went wrong. Please check that the API key is set and try again.',
          };
        }
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Skill not found</p>
          <button
            onClick={() => router.push('/results')}
            className="text-[#ff6b35] hover:underline"
          >
            {t('lesson.backToResults')}
          </button>
        </div>
      </div>
    );
  }

  // Find skill result from diagnostic
  const skillResult = diagnosticResult?.skills.find((s) => s.skillId === skillId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Lesson Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-4 py-3"
      >
        <div className="container mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/results')}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff6b35]" />
                <h1 className="font-semibold text-gray-900">{skill.displayName}</h1>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {skill.topic}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {skill.difficulty}
                </span>
                {skillResult && (
                  <span className="text-xs text-[#ff6b35] bg-orange-50 px-2 py-0.5 rounded">
                    {Math.round(skillResult.accuracy * 100)}% {t('common.accuracy')}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-[#ff6b35] bg-orange-50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {t('lesson.title')}
          </span>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              role={msg.role}
              content={msg.content}
              isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
            />
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="container mx-auto max-w-2xl">
        <ChatInput
          onSend={sendMessage}
          disabled={isStreaming}
          placeholder={t('lesson.placeholder')}
        />
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <LessonContent />
    </Suspense>
  );
}
