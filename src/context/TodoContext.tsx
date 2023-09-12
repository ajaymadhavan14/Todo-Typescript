import React, { createContext, useContext } from "react";
import { ITask } from "../interface";

interface DataContextType {
  todoList: ITask[];
  setTodoList: React.Dispatch<React.SetStateAction<ITask[]>>;
  addTask: (text: string, date: string, time: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
