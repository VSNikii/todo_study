import React, { useState, ChangeEventHandler } from "react";




type EditableSpanPropsType = {
  title: string,
  onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
  let { title } = props;

  let [editMode, setEditMode] = useState(false);
  let [valueTask, setValueTask] = useState(title);

  const activateDoubleClick = () => {
    setEditMode(true);
  }
  const activateVueMode = () => {
    setEditMode(false);
    props.onChange(valueTask)
  }
  const onChangeEditMode = (e: ChangeEventHandler<HTMLInputElement>) => {
    setValueTask(e.target.value);
    title = valueTask;
  }

  return editMode
    ? <input onChange={onChangeEditMode} value={valueTask} onBlur={activateVueMode} autoFocus/>
    : <span onDoubleClick={activateDoubleClick}>{title}</span>



}

export default EditableSpan;