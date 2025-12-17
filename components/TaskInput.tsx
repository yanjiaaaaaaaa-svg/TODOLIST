import React, { useState } from 'react';
import { Task, TaskAnalysis } from '../types';

interface TaskInputProps {
  onAddTask: (task: Task) => void;
  loading?: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, loading = false }) => {
  const [input, setInput] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      content: input.trim(),
      isUrgent,
      isImportant,
      isCompleted: false,
      createdAt: Date.now(),
    };

    onAddTask(newTask);
    setInput('');
    setIsUrgent(false);
    setIsImportant(false);
  };

  return (
    <div className="task-input">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="添加新任务..."
            className="task-text-input"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()} className="add-btn">
            添加
          </button>
        </div>
        <div className="priority-row">
          <label className="priority-label">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              disabled={loading}
            />
            紧急
          </label>
          <label className="priority-label">
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              disabled={loading}
            />
            重要
          </label>
        </div>
      </form>
    </div>
  );
};