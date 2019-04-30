import React, { useState, useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";

import "./index.css";
import TodoTask from "../TodoTask";

export default function Todo() {
  const reducer = (todos, action) => {
    switch (action.type) {
      case "addTodo":
        return [...todos, action.todos];
      case "removeTodo":
        return [...action.todos];
      case "editTodo":
        return [...action.todos];
      default:
        return todos;
    }
  };

  const [todo, setTodo] = useState();
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("Todos"))
  );

  useEffect(() => {
    if (todos === null) {
      localStorage.setItem("Todos", JSON.stringify(["Dodaj Swoje Taski !"]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const toggleChange = e => {
    setTodo(e.target.value);
  };

  const addTask = value => {
    if (todos.every(task => task !== value))
      dispatch({ todos: todo, type: "addTodo" });
    else alert("Nie możesz dodać dwóch takich samych zadań !");
  };

  const removeTask = value => {
    const filteredTodos = todos.filter(todo => todo !== value);
    dispatch({ todos: filteredTodos, type: "removeTodo" });
  };

  const editTask = (val, id) => {
    const tasks = [...todos];
    tasks[id] = val;
    dispatch({ todos: tasks, type: "editTodo" });
  };

  if (JSON.parse(localStorage.getItem("UserAccess")) !== true) {
    alert("Nie Jesteś Zalogowany !");
    return <Redirect to="/login" />;
  }

  return (
    <>
      <button
        onClick={() => {
          localStorage.setItem("UserAccess", JSON.stringify(false));
          window.location.reload(true);
        }}
      >
        Log Out
      </button>
      <div className="todosCnt">
        <h1>List Of My Tasks</h1>
        {todos.map((task, i) => (
          <TodoTask
            key={i}
            id={i}
            task={task}
            removeTask={removeTask}
            editTask={editTask}
          />
        ))}
        <input type="text" onChange={e => toggleChange(e)} />
        <button onClick={() => addTask(todo)}>+</button>
      </div>
    </>
  );
}
