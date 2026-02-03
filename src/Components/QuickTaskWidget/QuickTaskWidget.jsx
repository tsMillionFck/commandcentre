import React, { useState } from "react";
import { useSystem } from "../../Context/SystemContext";
// import './QuickTaskWidget.css'

export const QuickTaskWidget = () => {
  const [input, setInput] = useState("");
  const { tasks, dispatchTask, handleTaskToggle } = useSystem();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatchTask({
      type: "ADD_TASK",
      payload: input,
    });
    setInput("");
  };

  return (
    <div className="flex flex-col gap-2.5 h-full w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Capture Thought..."
          className="flex-grow bg-zinc-900 border border-emerald-500 text-emerald-400 p-2 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder:text-zinc-700"
        />
        <button
          type="submit"
          className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20 px-3 transition-colors font-bold"
        >
          +
        </button>
      </form>

      <div className="flex flex-col gap-1 overflow-y-auto min-h-0 pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex gap-2 p-1.5 cursor-pointer border-l-2 transition-all duration-200 hover:bg-emerald-500/5 shrink-0 ${task.isDone ? "opacity-40 line-through border-zinc-500" : "border-emerald-500"}`}
            onClick={() => handleTaskToggle(task.id, task.text)}
          >
            <span className="text-xs">{task.isDone ? "■" : "□"}</span>
            <span className="text-xs font-mono text-zinc-300 break-words">
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
