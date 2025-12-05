import TaskItem from './TaskItem';
import './TaskList.css';

export default function TaskList({ tasks, title, onToggle, onDelete, onEdit, isEmpty }) {
  if (isEmpty) {
    return (
      <section className="task-section">
        <h2 className="section-title">{title}</h2>
        <div className="empty-state">
          <p>Aucune tache pour le moment</p>
        </div>
      </section>
    );
  }

  return (
    <section className="task-section">
      <h2 className="section-title">{title}</h2>
      <div className="tasks-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
}
