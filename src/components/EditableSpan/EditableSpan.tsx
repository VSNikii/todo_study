import { TextField } from "@mui/material";
import React, { useState, ChangeEventHandler, useCallback } from "react";




type EditableSpanPropsType = {
  title: string,
  onChange: (newValue: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let { title } = props;

  let [editMode, setEditMode] = useState(false);
  let [valueTask, setValueTask] = useState(title);

  const activateDoubleClick = () => {
    setEditMode(true);
  }

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(valueTask)
  }

  const onChangeEditMode =(e: ChangeEventHandler<HTMLInputElement>) => {
    setValueTask(e.target.value);
    title = valueTask;
  }

  return editMode
    ? <TextField id="filled-basic" label="Title" variant="filled" onChange={onChangeEditMode} value={valueTask} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateDoubleClick}>{title}</span>



});

export default EditableSpan;