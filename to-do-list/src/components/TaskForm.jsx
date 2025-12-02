import { useState } from 'react';
import { formatDateForInput } from '../utils/taskManager';
import './TaskForm.css';

export default function TaskForm({ onAddTask, editingTask, onEditComplete }) {
  const [description, setDescription] = useState(editingTask?.description || '');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? formatDateForInput(editingTask.dueDate) : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Veuillez entrer une description pour la tâche');
      return;
    }

    if (editingTask) {
      onEditComplete({
        ...editingTask,
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });
    } else {
      onAddTask({
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });
    }

    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="description">Tâche *</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Entrez une description de tâche..."
          className={`form-input ${error ? 'input-error' : ''}`}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Date butoir (optionnelle)</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="btn-submit">
        {editingTask ? '✏️ Modifier la tâche' : '➕ Ajouter une tâche'}
      </button>
    </form>
  );
}
