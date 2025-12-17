import React from 'react';
import { Task, PALETTE } from '../types';
import { format, differenceInDays, addDays } from 'date-fns';

interface GanttViewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GanttView: React.FC<GanttViewProps> = ({ tasks, onToggle, onDelete }) => {
  const activeTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  // Calculate date range for the Gantt chart
  const today = new Date();
  const taskDates = activeTasks
    .filter(task => task.dueDate)
    .map(task => new Date(task.dueDate!));

  const minDate = taskDates.length > 0 ? new Date(Math.min(...taskDates.map(d => d.getTime()))) : today;
  const maxDate = taskDates.length > 0 ? new Date(Math.max(...taskDates.map(d => d.getTime()))) : addDays(today, 30);
  const totalDays = differenceInDays(maxDate, minDate) + 1;

  const getTaskPosition = (task: Task) => {
    if (!task.dueDate) return { left: 0, width: 0 };

    const dueDate = new Date(task.dueDate);
    const createdDate = new Date(task.createdAt);
    const taskDuration = Math.max(1, differenceInDays(dueDate, createdDate));

    const startOffset = Math.max(0, differenceInDays(createdDate, minDate));
    const left = (startOffset / totalDays) * 100;
    const width = (taskDuration / totalDays) * 100;

    return { left, width };
  };

  const getTaskColor = (task: Task) => {
    if (task.isCompleted) return PALETTE.BEIGE;
    if (task.isUrgent && task.isImportant) return PALETTE.RED;
    if (!task.isUrgent && task.isImportant) return PALETTE.BLUE;
    if (task.isUrgent && !task.isImportant) return PALETTE.YELLOW;
    return PALETTE.GREEN;
  };

  return (
    <div className="gantt-view">
      <div className="gantt-header">
        <h2>甘特图视图</h2>
      </div>

      <div className="gantt-chart">
        <div className="gantt-timeline">
          <div className="timeline-header">
            <div className="task-label">任务</div>
            <div className="timeline-dates">
              {Array.from({ length: Math.min(totalDays, 30) }, (_, i) => {
                const date = addDays(minDate, i);
                return (
                  <div key={i} className="timeline-date">
                    {format(date, 'M/d')}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="gantt-tasks">
            {activeTasks.map((task, index) => {
              const position = getTaskPosition(task);
              return (
                <div key={task.id} className="gantt-task-row">
                  <div className="gantt-task-name">
                    <span className={`task-status ${task.isCompleted ? 'completed' : ''}`}>
                      {task.isCompleted ? '✓' : '○'}
                    </span>
                    {task.content}
                  </div>
                  <div className="gantt-task-bar-container">
                    <div
                      className="gantt-task-bar"
                      style={{
                        left: `${position.left}%`,
                        width: `${position.width}%`,
                        backgroundColor: getTaskColor(task),
                      }}
                      title={task.content}
                    >
                      <span className="task-bar-text">{task.content}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {completedTasks.length > 0 && (
        <div className="completed-tasks">
          <h3>已完成任务 ({completedTasks.length})</h3>
          <div className="completed-list">
            {completedTasks.map(task => (
              <div key={task.id} className="completed-task">
                <span className="completed-check">✓</span>
                <span className="completed-content">{task.content}</span>
                <button
                  onClick={() => onDelete(task.id)}
                  className="delete-btn"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};