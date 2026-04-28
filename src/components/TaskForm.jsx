import { useState, useEffect } from 'react';
import { formatDateTimeForInput } from '../utils/taskManager';
import './TaskForm.css';

export default function TaskForm({ onAddTask, editingTask, onEditComplete }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDescription(editingTask?.description || '');
    setDueDate(editingTask?.dueDate ? formatDateTimeForInput(editingTask.dueDate) : '');
    setError('');
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Veuillez entrer une description pour la tâche');
      return;
    }

    const taskPayload = {
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    if (editingTask) {
      onEditComplete({
        ...editingTask,
        ...taskPayload,
      });
    } else {
      onAddTask(taskPayload);
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
        <label htmlFor="dueDate">Date et heure d’échéance (optionnelle)</label>
        <input
          type="datetime-local"
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
