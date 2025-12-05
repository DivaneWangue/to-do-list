// Utilitaires pour localStorage

const STORAGE_KEY = 'todolist_tasks';

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des tâches:', error);
  }
};

export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des tâches:', error);
    return [];
  }
};

export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression des tâches:', error);
  }
};
