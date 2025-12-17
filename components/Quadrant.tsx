import React from 'react';
import { Task, QuadrantID, PALETTE } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className={`task-text ${task.isCompleted ? 'completed' : ''}`}>
          {task.content}
        </span>
      </div>
      <div className="task-actions">
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          ×
        </button>
      </div>
    </div>
  );
};

interface QuadrantProps {
  quadrantId: QuadrantID;
  tasks: Task[];
  title: string;
  color: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export const Quadrant: React.FC<QuadrantProps> = ({
  quadrantId,
  tasks,
  title,
  color,
  onToggle,
  onDelete,
  onEdit
}) => {
  const filteredTasks = tasks.filter(task => {
    const isUrgent = task.isUrgent;
    const isImportant = task.isImportant;

    switch (quadrantId) {
      case QuadrantID.Q1:
        return isUrgent && isImportant;
      case QuadrantID.Q2:
        return !isUrgent && isImportant;
      case QuadrantID.Q3:
        return isUrgent && !isImportant;
      case QuadrantID.Q4:
        return !isUrgent && !isImportant;
      default:
        return false;
    }
  });

  return (
    <div className="quadrant" style={{ backgroundColor: color }}>
      <h3 className="quadrant-title">{title}</h3>
      <div className="tasks-container">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};