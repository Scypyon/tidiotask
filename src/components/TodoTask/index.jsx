import React, { useState } from "react";
import "./index.css";

export default function TodoTask({ removeTask, task, editTask, id }) {
  const [isEdited, setIsEdited] = useState(false);
  const [todo, setTodo] = useState();

  return (
    <div>
      <div className="task">
        <p>{task}</p>
        <div onClick={() => setIsEdited(!isEdited)}>Edit</div>
        <div onClick={() => removeTask(task)}>x</div>
      </div>
      <div
        style={{
          display: `${isEdited ? "block" : "none"}`,
          marginBottom: `5px`
        }}
      >
        <input
          placeholder={task}
          type="text"
          onChange={e => setTodo(e.target.value)}
        />
        <button onClick={() => editTask(todo, id)} className="edit">
          update
        </button>
      </div>
    </div>
  );
}
