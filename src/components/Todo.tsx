import React, { FC, useState, ChangeEvent } from "react";
import "../App.css";
import { ITask } from "../interface";
import TodoTask from "./TodoTask";
import { useDataContext } from "../context/TodoContext";

const Todo: FC = () => {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const { todoList, addTask } = useDataContext();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else if (event.target.name === "time") {
      setTime(event.target.value);
    } else {
      setDate(event.target.value);
    }
  };

  const handleAddTask = () => {
    if (date === "" || task === "" || time === "") {
      alert("Please fill in both input fields");
    } else {
      addTask(task, date, time);
      setTask("");
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="date"
            placeholder="Date"
            name="date"
            onChange={handleChange}
          />
          <input type="time" name="time" onChange={handleChange} />
          <input
            type="text"
            placeholder="Task..."
            name="task"
            defaultValue={task}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} />;
        })}
      </div>
    </div>
  );
};

export default Todo;
