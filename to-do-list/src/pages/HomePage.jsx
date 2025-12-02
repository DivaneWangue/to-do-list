import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { sortTasks } from '../utils/taskManager';
import { saveTasks, loadTasks } from '../utils/storage';
import './HomePage.css';

export default function HomePage() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [editingTask, setEditingTask] = useState(null);

  // Sauvegarder les tâches chaque fois qu'elles changent
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      description: taskData.description,
      dueDate: taskData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleEditComplete = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const { toDoTasks, completedTasks } = sortTasks(tasks);

  return (
    <div className="home-page">
      <header className="page-header">
        <h1 className="page-title"> My To-Do List</h1>
      </header>

      <main className="page-content">
        <TaskForm
          onAddTask={handleAddTask}
          editingTask={editingTask}
          onEditComplete={handleEditComplete}/>

        <TaskList
          tasks={toDoTasks}
          title="Tâches à faire"
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isEmpty={toDoTasks.length === 0}/>

        <TaskList
          tasks={completedTasks}
          title="Tâches terminées"
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isEmpty={completedTasks.length === 0} />
      </main>

      <footer className="page-footer">
        <p>Total: {tasks.length} tâches | À faire: {toDoTasks.length} | Terminées: {completedTasks.length}</p>
      </footer>
    </div>
  );
}
