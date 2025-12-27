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

  const addTask = async (title, date) => {
    const id = Date.now().toString();
    await dbAddTask(id, title, date);

    const updatedTasks = await getAllTasks();
    setTask(updatedTasks);
  };

  const updateTask = async (title, date, id) => {
    await dbUpdateTask(title, date, id);

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
