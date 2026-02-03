import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

const SystemContext = createContext(); //We defiend the context her
//Why did we created SystemContext, when we are using SystemProvider to define data ans SystemContext.Provider to give childern data

const logReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOG":
      return [
        {
          id: Date.now(),
          text: action.payload,
          time: new Date().toLocaleTimeString(),
          type: action.logType || "info",
        },
        ...state,
      ].slice(0, 50);
    case "CLEAR_LOG":
      return [];
    default:
      return state;
  }
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          id: Date.now(),
          text: action.payload,
          time: new Date().toLocaleTimeString(),
          isDone: false,
        },
        ...state,
      ];
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "DONE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
      );
    default:
      return state;
  }
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "RESET_DESKTOP":
      return {
        ...state,
        resetTrigger: Date.now(),
      };
  }
};

export const SystemProvider = ({ children }) => {
  //Defining the Log Reduce which can be used in anywhere in the system
  const [logs, dispatch] = useReducer(logReducer, []);
  const [place, dispatchPlace] = useReducer(stateReducer, []);
  const [tasks, dispatchTask] = useReducer(taskReducer, []);

  const handleTaskToggle = (id, text) => {
    dispatchTask({
      type: "DONE_TASK",
      payload: id,
    });

    dispatch({
      type: "ADD_LOG",
      payload: `Task status changed ${text}`,
      logType: "info",
    });
  };

  //this is where the main data lives, which can be used all accross the application
  const [state, setState] = useState({
    theme: "matrix",
    user: {
      name: "Yashu",
      level: 50,
    },
    pbSolve: {
      solved: 10,
      total: 100,
    },
    activeWidget: ["market", "logs", "tasks"],
  }); //This is the whole main data, including the theme, user Identity, user Pb Skills, which widget is active on the screen.

  //Functions, which are shared all accorss the application making it easier
  //Functions, which are shared all accorss the application making it easier
  //Theme Toggle, so every body would knew that the theme is changes
  const toggleTheme = () => {
    setState((prev) => {
      const nextTheme =
        prev.theme === "matrix"
          ? "light"
          : prev.theme === "light"
            ? "dark"
            : "matrix";
      return {
        ...prev,
        theme: nextTheme,
      };
    });

    dispatch({
      type: "ADD_LOG",
      payload: `Theme shifted to ${state.theme === "matrix" ? "light" : state.theme === "light" ? "dark" : "matrix"}`,
      logType: "info",
    });
  };

  //A function which adds the amount of the problem solved by the user in the Main Data(the Context). So we can use it anywhere
  const addSolved = (amount) => {
    setState((prev) => ({
      ...prev,
      pbSolve: { ...prev.pbSolve, solved: prev.pbSolve.solved + amount },
    }));
  };

  useEffect(() => {
    localStorage.setItem("YS_OS_TASK", JSON.stringify(tasks));
  }, [tasks]);

  return (
    //We are defining here which things should be shared to childern, inside the SystemContext.Provider.
    <SystemContext.Provider
      value={{
        state,
        toggleTheme,
        addSolved,
        logs,
        dispatch,
        place,
        dispatchPlace,
        tasks,
        dispatchTask,
        handleTaskToggle,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

// A hook, I never used it. Why did we create it
export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context)
    throw new Error("useSystem must be used within a SystemProvider");
  return context;
};
