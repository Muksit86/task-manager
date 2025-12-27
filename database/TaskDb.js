import * as SqlLite from "expo-sqlite";

export const db = SqlLite.openDatabaseSync("tasks.db");

export const initDb = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        date TEXT
    );`
  );
};

export const dbDeleteTask = async () => {
  await db.runAsync(`DROP TABLE IF EXISTS tasks`);
};

export const dbAddTask = async (id, title, date) => {
  await db.runAsync(`INSERT INTO tasks (id, title, date) VALUES (?, ?, ?)`, [
    id,
    title,
    date,
  ]);
};

export const dbUpdateTask = async (title, date, id) => {
  await db.runAsync(`UPDATE tasks SET title = ?, date = ? WHERE id = ?`, [
    title,
    date,
    id,
  ]);
};

export const dbDeleteTaskById = async (id) => {
  await db.runAsync(`DELETE FROM tasks WHERE id = ?`, [id]);
};

export const getAllTasks = async () => {
  const result = await db.getAllAsync(`SELECT * FROM tasks ORDER BY date DESC`);
  return result;
};
