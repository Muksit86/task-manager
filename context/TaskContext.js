import { createContext, useEffect, useState } from "react";
import {
  dbAddTask,
  dbDeleteTask,
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
    console.log(updatedTasks);
    setTask(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
