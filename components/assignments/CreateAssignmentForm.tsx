'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import type { Assignment } from '@/types/assignments';

interface CreateAssignmentFormProps {
  studentNames: string[];
  onSubmit: (assignment: Assignment) => void;
  onCancel: () => void;
}

export function CreateAssignmentForm({ studentNames, onSubmit, onCancel }: CreateAssignmentFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const toggleStudent = (name: string) => {
    setSelectedStudents((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    if (!title.trim() || !dueDate || selectedStudents.length === 0) return;
    const formatted = new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    onSubmit({
      id: `a-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      dueDate: formatted,
      assignedStudents: selectedStudents,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
  };

  const isValid = title.trim() && dueDate && selectedStudents.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">New Assignment</h3>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-200">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Percent Change Practice"
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the assignment..."
            rows={2}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Assign To</label>
          <div className="flex flex-wrap gap-2">
            {studentNames.map((name) => (
              <button
                key={name}
                onClick={() => toggleStudent(name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedStudents.includes(name)
                    ? 'bg-[#1a3a52] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-4 py-2 text-sm font-medium text-white bg-[#ff6b35] rounded-lg hover:bg-[#e55a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Assignment
          </button>
        </div>
      </div>
    </motion.div>
  );
}
