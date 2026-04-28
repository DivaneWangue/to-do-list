// Utilitaires pour la gestion des tâches

export const isTaskOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const isTaskNearlyDue = (dueDate) => {
  if (!dueDate) return false;
  const now = new Date();
  const dueDateObj = new Date(dueDate);
  const diffMinutes = (dueDateObj - now) / 1000 / 60;
  return diffMinutes >= 0 && diffMinutes <= 60;
};

export const sortTasks = (tasks) => {
  // Séparer les tâches complétées et non complétées
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Trier les tâches incomplètes
  // 1. D'abord celles avec date, triées par date croissante
  // 2. Ensuite celles sans date
  const tasksWithDate = incompleteTasks.filter(task => task.dueDate).sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const tasksWithoutDate = incompleteTasks.filter(task => !task.dueDate);

  // Trier les tâches complétées par date de complétion décroissante
  const sortedCompletedTasks = completedTasks.sort((a, b) => {
    return new Date(b.completedAt || 0) - new Date(a.completedAt || 0);
  });

  return {
    toDoTasks: [...tasksWithDate, ...tasksWithoutDate],
    completedTasks: sortedCompletedTasks,
  };
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
};

export const formatDateTimeForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
