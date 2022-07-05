import "../App/App.css";
import React from "react";
import TaskList from "../TaskList/TaskList";
import Form from "../Form/Form";
import AuthContextProvider from "../../Store/AuthContextProvider";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="main-parent">
        <h1>To do list</h1>

        <div className="main-container">
          <Form />
          <TaskList />
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default App;
