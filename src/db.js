import Dexie from "dexie";

// Create the database
export const db = new Dexie("todoDB");

// Define the schema
db.version(1).stores({
  todos: "++id, text, done", // ++id = auto-incrementing primary key
});
