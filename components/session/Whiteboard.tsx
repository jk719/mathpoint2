'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Pencil, Type, Eraser, Trash2 } from 'lucide-react';
import type { Room } from 'livekit-client';

type Tool = 'pen' | 'text' | 'eraser';

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  tool: 'pen' | 'eraser';
}

interface TextItem {
  x: number;
  y: number;
  content: string;
  color: string;
}

interface WhiteboardProps {
  room?: Room;
}

const COLORS = ['#1a3a52', '#ff6b35', '#ef4444', '#22c55e', '#3b82f6', '#000000'];

export function Whiteboard({ room }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#1a3a52');
  const [isDrawing, setIsDrawing] = useState(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const textsRef = useRef<TextItem[]>([]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all strokes
    for (const stroke of strokesRef.current) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = stroke.tool === 'eraser' ? '#f3f4f6' : stroke.color;
      ctx.lineWidth = stroke.tool === 'eraser' ? 20 : stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }

    // Draw current stroke
    const current = currentStrokeRef.current;
    if (current && current.points.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = current.tool === 'eraser' ? '#f3f4f6' : current.color;
      ctx.lineWidth = current.tool === 'eraser' ? 20 : current.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(current.points[0].x, current.points[0].y);
      for (let i = 1; i < current.points.length; i++) {
        ctx.lineTo(current.points[i].x, current.points[i].y);
      }
      ctx.stroke();
    }

    // Draw text items
    for (const text of textsRef.current) {
      ctx.font = '16px Inter, sans-serif';
      ctx.fillStyle = text.color;
      ctx.fillText(text.content, text.x, text.y);
    }
  }, []);

  // Resize canvas to fill container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      redraw();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [redraw]);

  // Listen for incoming whiteboard data from other participants
  useEffect(() => {
    if (!room) return;

    const handleData = (payload: Uint8Array) => {
      const text = new TextDecoder().decode(payload);
      try {
        const data = JSON.parse(text);
        if (data.type === 'wb-stroke') {
          strokesRef.current.push(data.stroke);
          redraw();
        } else if (data.type === 'wb-text') {
          textsRef.current.push(data.text);
          redraw();
        } else if (data.type === 'wb-clear') {
          strokesRef.current = [];
          textsRef.current = [];
          redraw();
        }
      } catch {
        // Not a whiteboard message
      }
    };

    room.on('dataReceived', handleData);
    return () => { room.off('dataReceived', handleData); };
  }, [room, redraw]);

  const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (tool === 'text') {
      const point = getCanvasPoint(e);
      const content = prompt('Enter text:');
      if (content) {
        const textItem: TextItem = { x: point.x, y: point.y, content, color };
        textsRef.current.push(textItem);
        redraw();
        broadcastData({ type: 'wb-text', text: textItem });
      }
      return;
    }

    setIsDrawing(true);
    const point = getCanvasPoint(e);
    currentStrokeRef.current = {
      points: [point],
      color,
      width: 2,
      tool: tool === 'eraser' ? 'eraser' : 'pen',
    };
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const point = getCanvasPoint(e);
    currentStrokeRef.current.points.push(point);
    redraw();
  };

  const stopDrawing = () => {
    if (!isDrawing || !currentStrokeRef.current) return;
    setIsDrawing(false);
    const stroke = currentStrokeRef.current;
    strokesRef.current.push(stroke);
    currentStrokeRef.current = null;
    broadcastData({ type: 'wb-stroke', stroke });
    redraw();
  };

  const clearBoard = () => {
    strokesRef.current = [];
    textsRef.current = [];
    redraw();
    broadcastData({ type: 'wb-clear' });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const broadcastData = (data: any) => {
    if (!room?.localParticipant) return;
    const encoded = new TextEncoder().encode(JSON.stringify(data));
    room.localParticipant.publishData(encoded, { reliable: true });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
      {/* Toolbar */}
      <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-white border-b border-gray-200 flex-wrap">
        <button
          onClick={() => setTool('pen')}
          className={`p-2 rounded-lg transition-colors ${tool === 'pen' ? 'bg-[#1a3a52] text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          title="Pen"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTool('text')}
          className={`p-2 rounded-lg transition-colors ${tool === 'text' ? 'bg-[#1a3a52] text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          title="Text"
        >
          <Type className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTool('eraser')}
          className={`p-2 rounded-lg transition-colors ${tool === 'eraser' ? 'bg-[#1a3a52] text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          title="Eraser"
        >
          <Eraser className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c ? 'border-gray-800 scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: c }}
          />
        ))}

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button
          onClick={clearBoard}
          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          title="Clear"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
}
