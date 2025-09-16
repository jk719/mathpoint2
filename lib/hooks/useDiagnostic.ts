'use client';

import { useState, useCallback } from 'react';
import { DiagnosticState, StudentResponse } from '@/types';

export function useDiagnostic() {
  const [state, setState] = useState<DiagnosticState>({
    session: null,
    currentQuestion: null,
    questionHistory: [],
    responseHistory: [],
    diagnosis: {
      strengths: [],
      weaknesses: [],
      errorPatterns: [],
      confidence: 0,
    },
    isLoading: false,
    error: null,
  });

  const startDiagnostic = useCallback(async (userId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/diagnostic/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to start diagnostic');
      }

      const { data } = await response.json();

      setState((prev) => ({
        ...prev,
        session: {
          id: data.sessionId,
          userId,
          startTime: new Date(),
          questionsAsked: [],
          responses: [],
          currentPath: ['main'],
          isComplete: false
        },
        currentQuestion: data.currentQuestion,
        questionHistory: [data.currentQuestion],
        isLoading: false,
      }));

      return data;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
      throw error;
    }
  }, []);

  const submitAnswer = useCallback(async (response: StudentResponse) => {
    if (!state.session) {
      throw new Error('No active session');
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch('/api/diagnostic/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.session.id,
          response,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit answer');
      }

      const { data } = await res.json();

      setState((prev) => ({
        ...prev,
        currentQuestion: data.nextQuestion,
        questionHistory: data.nextQuestion
          ? [...prev.questionHistory, data.nextQuestion]
          : prev.questionHistory,
        responseHistory: [...prev.responseHistory, response],
        diagnosis: data.diagnosis,
        isLoading: false,
      }));

      return data;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
      throw error;
    }
  }, [state.session]);

  const resetDiagnostic = useCallback(() => {
    setState({
      session: null,
      currentQuestion: null,
      questionHistory: [],
      responseHistory: [],
      diagnosis: {
        strengths: [],
        weaknesses: [],
        errorPatterns: [],
        confidence: 0,
      },
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    startDiagnostic,
    submitAnswer,
    resetDiagnostic,
  };
}