'use client';

import { useEffect, useRef, useState } from 'react';

interface StreamingTextProps {
  text: string;
  speedMsPerChar?: number;
}

export function StreamingText({ text, speedMsPerChar = 25 }: StreamingTextProps) {
  const initialLenRef = useRef(text.length);
  const [displayed, setDisplayed] = useState(text.length);

  useEffect(() => {
    if (displayed >= text.length) return;

    const lag = text.length - displayed;
    const isNewContent = text.length > initialLenRef.current;
    if (!isNewContent) {
      setDisplayed(text.length);
      return;
    }

    const interval = lag > 300 ? 5 : speedMsPerChar;
    const stride = lag > 600 ? Math.ceil(lag / 200) : 1;

    const id = window.setInterval(() => {
      setDisplayed((prev) => {
        const next = Math.min(prev + stride, text.length);
        if (next >= text.length) window.clearInterval(id);
        return next;
      });
    }, interval);

    return () => window.clearInterval(id);
  }, [text, displayed, speedMsPerChar]);

  return <>{text.slice(0, displayed)}</>;
}
