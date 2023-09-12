import React, { useState, ReactNode } from "react";
import { DataContext } from "./TodoContext";
import { ITask } from "../interface";

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const addTask = (task: string, date: string, time: string) => {
    const newTask: ITask = {
      taskName: task,
      date: date,
      time: time,
      id: Math.random(),
      status: false,
    };
    const updatedTodoList = [...todoList, newTask];

    updatedTodoList.sort((taskA, taskB) => {
      const dateTimeA:any = new Date(`${taskA.date} ${taskA.time}`);
      const dateTimeB:any = new Date(`${taskB.date} ${taskB.time}`);
      return dateTimeA - dateTimeB;
    });
  
    setTodoList(updatedTodoList);
    // setTodoList([...todoList, newTask]);
    // console.log(todoList);
  };
  return (
    <DataContext.Provider value={{ todoList, setTodoList, addTask }}>
      {children}
    </DataContext.Provider>
  );
};
