import React from "react";

const AuthContext = React.createContext({
  tasks: [],
  onEditButtonClick: (id) => {},
  onDeleteButtonClick: (id) => {},
  buttonEditOperation: false,
  formState: {},
  dispatchForm: () => {},
  addNewTask: () => {},
  editSelectedTask: () => {},
});

export default AuthContext;
