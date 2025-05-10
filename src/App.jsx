import { useEffect, useState } from "react";
import { db } from "./db";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Load todos from IndexedDB
  useEffect(() => {
    const loadTodos = async () => {
      const allTodos = await db.todos.toArray();
      setTodos(allTodos);
    };
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (input.trim()) {
      const id = await db.todos.add({ text: input, done: false });
      setTodos([...todos, { id, text: input, done: false }]);
      setInput("");
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    await db.todos.update(id, { done: !todo.done });
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = async (id) => {
    await db.todos.delete(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: "2rem" }}>
      <h1>📝 To-Do List (Dexie)</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTodo}>Add</button>

      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggle={() => toggleTodo(todo.id)}
          remove={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

export default App;
