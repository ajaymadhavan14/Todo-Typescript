import React from "react";
import { DataProvider } from "./context/DataProvider";
import Todo from "./components/Todo";

function App() {
  return (
    <DataProvider>
      <Todo />
    </DataProvider>
  );
}

export default App;
