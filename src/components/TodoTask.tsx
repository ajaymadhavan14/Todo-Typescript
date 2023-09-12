import React, { ChangeEvent, useState } from "react";
import { ITask } from "../interface";
import { useDataContext } from "../context/TodoContext";

interface Props {
  task: ITask;
}

const TodoTask = ({ task }: Props) => {
  const { todoList, setTodoList } = useDataContext();

  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<string>("");
  const [editTime, setEditTime] = useState<string>("");
  const [newData, setNewData] = useState<string|undefined>(undefined);
  const [newTime, setNewTime] = useState<string|undefined>(undefined);
  const [isCompleted, setIsCompleted] = useState(false);

  const editTask = (editName: string) => {
    setEdit(true);
    const data = todoList.find((task: ITask) => {
      return task.taskName === editName;
    });
    // console.log(data);
    if (data) {
      setEditData(data.taskName);
      setEditTime(data.time);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "editTask") {
      setNewData(event.target.value);
    } else {
      setNewTime(event.target.value);
    }
  };

  const handleStatusChange = () => {
    setIsCompleted(!isCompleted);
  };

  const doneTask = (id: number) => {
    const updatedTodoList = todoList.map((task: ITask) => {
      if (task.id === id) {
        return { ...task, taskName: newData??editData, time: newTime??editTime };
      }
      return task;
    });
     
    updatedTodoList.sort((taskA, taskB) => {
      const dateTimeA:any = new Date(`${taskA.date} ${taskA.time}`);
      const dateTimeB:any = new Date(`${taskB.date} ${taskB.time}`);
      return dateTimeA - dateTimeB;
    });

    setTodoList(updatedTodoList);
    setEdit(false);
  };

  return (
    <div className="task">
      <div className="content">
        <span>
          {isCompleted ? (
            <button style={{ width: "100%", height: "100%" }} disabled>
              Completed
            </button>
          ) : (
            <>
              <input
                type="checkbox"
                name="statusChange"
                id="statusChange"
                checked={isCompleted}
                onChange={handleStatusChange}
              />
              <label htmlFor="statusChange">finish</label>
            </>
          )}
        </span>
        <span>{task.date}</span>

        {edit ? (
          <span>
            <input
              style={{ width: "90%", height: "80%" }}
              type="time"
              onChange={handleChange}
              name="editTime"
              defaultValue={editTime}
            />
          </span>
        ) : (
          <span>{task.time}</span>
        )}
        {edit ? (
          <span>
            <input
              style={{ width: "90%", height: "80%" }}
              type="text"
              onChange={handleChange}
              name="editTask"
              defaultValue={editData}
            />
          </span>
        ) : (
          <span>{task.taskName}</span>
        )}
      </div>
      {isCompleted ? null : edit ? (
        <button
          onClick={() => {
            doneTask(task.id);
          }}
        >
          Done
        </button>
      ) : (
        <button
          onClick={() => {
            editTask(task.taskName);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default TodoTask;
