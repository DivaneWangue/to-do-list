// Utilitaires pour la gestion des tâches

export const isTaskOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateObj = new Date(dueDate);
  dueDateObj.setHours(0, 0, 0, 0);
  return dueDateObj < today;
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
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
