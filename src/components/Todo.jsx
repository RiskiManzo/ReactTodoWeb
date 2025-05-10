function Todo({ todo, toggle, remove }) {
    return (
      <div style={{ margin: "0.5rem 0", display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={toggle}
          style={{ marginRight: "1rem" }}
        />
        <span style={{ textDecoration: todo.done ? "line-through" : "none", flex: 1 }}>
          {todo.text}
        </span>
        <button onClick={remove} style={{ marginLeft: "1rem" }}>❌</button>
      </div>
    );
  }
  
  export default Todo;
  