import React, { useEffect } from "react";
import { useTimerContext } from "../context/TimerContext";
import { useState } from "react";

function Todos() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const { getBgColors } = useTimerContext();
  const {solid,transparent} = getBgColors();
  

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Could not parse saved todos", error);
      }
    }
  }, []);
  // Save todos in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  }
  
  function addOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function deleteTodo(indexToDelete: number) {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  }
  return (
    <div className="flex justify-center flex-col items-center space-y-2">
      <div className="flex gap-2">
        <input
          className="text-white px-4 py-2 rounded-lg outline-none border-2 border-blue-400"
          placeholder="add todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addOnEnter}
        ></input>
        <button
          onClick={addTodo}
          className={`${transparent} text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition`}
        >
          add
        </button>
      </div>

      <ul className="rounded-lg p-4 w-full max-w-md space-y-2">
        {todos.map((todo, index) => (
          <li
            className={`  text-white cursor-pointer hover:bg-white/10 px-3 py-2 rounded transition`}
            key={index}
            onClick={() => deleteTodo(index)}
          >
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
