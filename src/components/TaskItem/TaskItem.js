import styles from "./TaskItem.module.css";
import React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//I used css module just for practicing it

const taskItem = (props) => {

  return (
    <div className={styles['task-list-container']}>
      <div className="tasks">
        <h3 className={styles.h1}>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.date}>Due date : {props.date}</p>
      </div>  
      <div className={styles['edit-delete-button-container']}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            title="Edit task"
            className={styles['edit-button']}
            size="large"
            aria-label="delete"
            onClick={props.onEditButtonClick}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            title="Delete task"
            size="large"
            aria-label="delete"
            onClick={props.onDeleteButtonClick}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};
export default taskItem;
