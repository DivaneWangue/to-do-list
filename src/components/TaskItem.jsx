import { isTaskOverdue, isTaskNearlyDue } from '../utils/taskManager';
import './TaskItem.css';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const isOverdue = isTaskOverdue(task.dueDate) && !task.completed;
  const isNearlyDue = isTaskNearlyDue(task.dueDate) && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${(isOverdue || isNearlyDue) ? 'due-soon' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <div className="task-text">
          <p className="task-description">{task.description}</p>
          {task.dueDate && (
            <div className="task-date-container">
              <span className="task-date">
                ⏰ {new Date(task.dueDate).toLocaleString('fr-FR', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
              {(isOverdue || isNearlyDue) && (
                <span className="alert-icon">{isOverdue ? '🚨' : '🔔'}</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn-edit"
          title="Modifier"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-delete"
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
