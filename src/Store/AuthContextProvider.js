import React, { useState, useEffect, useReducer } from "react";
import AuthContext from "./Auth-context";

const defaultTasksState = {
  tasks: [],
  selectedTaskForEdit: null,
};

const tasksReducer = (prevState, action) => {
  if (action.type === "addNewTask") {
    let updatedTasks = [action.value, ...prevState.tasks];
    return {
      ...prevState,
      tasks: updatedTasks,
    };
  }
  if (action.type === "selectTaskForEdit") {
    return {
      ...prevState,
      selectedTaskForEdit: action.value,
    };
  }
  if (action.type === "editSelectedTask") {
    let updatedTasks = [...prevState.tasks];
    updatedTasks[prevState.selectedTaskForEdit] = action.value;
    return {
      ...prevState,
      tasks: updatedTasks,
    };
  }
  if (action.type === "deleteTask") {
    const updatedTasks = prevState.tasks.filter(
      (item, index) => index !== action.value
    );
    return {
      ...prevState,
      tasks: updatedTasks,
    };
  }
  if (action.type === "getTasksFromLocalStorage") {
    return {
      tasks: action.value,
      selectedTaskForEdit: null,
    };
  }
};

const defaultFormState = {
  titleValue: "",
  isTitleErrDisplayed: false,
  descriptionValue: "",
  isDescriptionErrDisplayed: false,
  dateValue: "",
  isDateErrDisplayed: false,
};

const formReducer = (prevState, action) => {
  if (action.type === "prepareFormToEditTask") {
    return {
      titleValue: action.value.title,
      isTitleErrDisplayed: false,
      descriptionValue: action.value.description,
      isDescriptionErrDisplayed: false,
      dateValue: action.value.date,
      isDateErrDisplayed: false,
    };
  }
  if (action.type === "checkInputIsEmpty") {
    return {
      ...prevState,
      isTitleErrDisplayed: prevState.titleValue.trim().length === 0,
      isDescriptionErrDisplayed: prevState.descriptionValue.trim().length === 0,
      isDateErrDisplayed: prevState.dateValue.trim().length === 0,
    };
  }
  if (action.type === "addTitleValue") {
    return {
      ...prevState,
      titleValue: action.value.title,
      isTitleErrDisplayed: action.value.title.trim().length === 0,
    };
  }
  if (action.type === "addDescriptionValue") {
    return {
      ...prevState,
      descriptionValue: action.value.description,
      isDescriptionErrDisplayed: action.value.description.trim().length === 0,
    };
  }
  if (action.type === "addDateValue") {
    return {
      ...prevState,
      dateValue: action.value.date,
      isDateErrDisplayed: action.value.date.trim().length === 0,
    };
  }
  if (action.type === "backToDefault") {
    return defaultFormState;
  }
  return defaultFormState;
};

const AuthContextProvider = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, defaultFormState);
  const [tasksState, dispatchTasks] = useReducer(
    tasksReducer,
    defaultTasksState
  );
  const [formEditOperation, setFormEditOperation] = useState(false);

  const addNewTask = (newTask) => {
    dispatchTasks({ type: "addNewTask", value: newTask });
  };

  const editSelectedTask = (newTask) => {
    dispatchTasks({ type: "editSelectedTask", value: newTask });
    setFormEditOperation(false);
  };

  const onDeleteButtonClick = (id) => {
    dispatchTasks({ type: "deleteTask", value: id });
  };

  const onEditButtonClick = (id) => {
    dispatchTasks({ type: "selectTaskForEdit", value: id });
    setFormEditOperation(true);
    dispatchForm({
      type: "prepareFormToEditTask",
      value: {
        title: tasksState.tasks[id].title,
        description: tasksState.tasks[id].description,
        date: tasksState.tasks[id].date,
      },
    });
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks && savedTasks.length > 0)
      dispatchTasks({ type: "getTasksFromLocalStorage", value: savedTasks });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksState.tasks));
  }, [tasksState.tasks]);

  return (
    <AuthContext.Provider
      value={{
        tasks: tasksState.tasks,
        onEditButtonClick: onEditButtonClick,
        onDeleteButtonClick: onDeleteButtonClick,
        formEditOperation: formEditOperation,
        formState: formState,
        dispatchForm: dispatchForm,
        addNewTask: addNewTask,
        editSelectedTask: editSelectedTask,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
