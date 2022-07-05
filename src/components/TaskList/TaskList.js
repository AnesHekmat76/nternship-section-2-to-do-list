import React, { useContext } from "react";
import TaskItem from "../TaskItem/TaskItem";
import "../TaskList/TaskList.css";
import AuthContext from "../../Store/Auth-context";

const TaskList = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <div className="list-container">
      {ctx.tasks.map((task, index) => {
        return (
          <TaskItem
            key={index}
            title={task.title}
            description={task.description}
            date={task.date}
            onDeleteButtonClick={() => {
              ctx.onDeleteButtonClick(index);
            }}
            onEditButtonClick={() => {
              ctx.onEditButtonClick(index);
            }}
          />
        );
      })}
    </div>
  );
};
export default TaskList;
