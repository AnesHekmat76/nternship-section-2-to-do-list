import React, { useContext } from "react";
import "./Form.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthContext from "../../Store/Auth-context";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Form = (props) => {
  const ctx = useContext(AuthContext);
  const { formState } = ctx;
  const { titleValue } = formState;
  const { descriptionValue } = formState;
  const { dateValue } = formState;
  const { isTitleErrDisplayed } = formState;
  const { isDescriptionErrDisplayed } = formState;
  const { isDateErrDisplayed } = formState;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      titleValue.trim().length === 0 ||
      descriptionValue.trim().length === 0 ||
      dateValue.trim().length === 0
    ) {
      ctx.dispatchForm({ type: "checkInputIsEmpty" });
      return;
    }

    ctx.dispatchForm({ type: "backToDefault" });

    let newTask = {
      title: titleValue,
      description: descriptionValue,
      date: dateValue,
    };
    if (!ctx.formEditOperation) {
      ctx.addNewTask(newTask);
    } else {
      ctx.editSelectedTask(newTask);
    }
  };

  return (
    <form onSubmit={onFormSubmit} className="form-container">
      <div className="text-field-container">
        <TextField
          value={titleValue}
          onChange={(e) => {
            ctx.dispatchForm({
              type: "addTitleValue",
              value: { title: e.target.value },
            });
          }}
          className="text-field"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          helperText={isTitleErrDisplayed ? "This field cannot be empty" : " "}
          error={isTitleErrDisplayed}
        />
      </div>
      <div className="text-field-container">
        <TextField
          value={descriptionValue}
          onChange={(e) => {
            ctx.dispatchForm({
              type: "addDescriptionValue",
              value: { description: e.target.value },
            });
          }}
          id="outlined-multiline-static"
          className="text-field"
          label="Description"
          multiline
          rows={4}
          helperText={
            isDescriptionErrDisplayed ? "This field cannot be empty" : " "
          }
          error={isDescriptionErrDisplayed}
        />
      </div>
      <div className="datePicker-container">
        <input
          className={`datePicker ${
            isDateErrDisplayed ? "datePicker-error" : ""
          }`}
          value={dateValue}
          onChange={(e) => {
            ctx.dispatchForm({
              type: "addDateValue",
              value: { date: e.target.value },
            });
          }}
          type="date"
        ></input>
        <p
          style={{
            display: isDateErrDisplayed ? "block" : "none",
          }}
          className="date-picker-error"
        >
          This field cannot be empty
        </p>
      </div>

      <div className="button-container">
        <Button variant="contained" className="submit-button" type="submit">
          {ctx.formEditOperation ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
