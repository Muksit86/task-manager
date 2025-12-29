import { createContext, useEffect, useState } from "react";
import {
  dbAddTask,
  dbDeleteTask,
  dbDeleteTaskById,
  dbUpdateTask,
  getAllTasks,
  initDb,
} from "../database/TaskDb";

export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      await initDb();
      const tasksFromDb = await getAllTasks();
      setTask(tasksFromDb);
    };

    loadTasks();
  }, []);

  const addTask = async (task) => {
    const date = task.date.toISOString();
    const id = Date.now().toString();
    await dbAddTask(id, task.title, date);
    const updatedTasks = await getAllTasks();
    setTask(updatedTasks);
  };

  const updateTask = async (editTask, id) => {
    console.log(editTask);
    const newDate = editTask.date.toISOString();
    await dbUpdateTask(editTask.title, newDate, id);
    const updatedTasks = await getAllTasks();
    setTask(updatedTasks);
  };

  const deleteTask = async (id) => {
    await dbDeleteTaskById(id);

    const updatedTasks = await getAllTasks();
    setTask(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
