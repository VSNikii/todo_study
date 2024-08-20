import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeMarkerTaskAC, changeTitleTaskAC, removeTaskAC } from "../../state/tasks-reducer";
import EditableSpan from "../EditableSpan/EditableSpan";
import { Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import React from "react";

type TaskPropsType = {
  todoId: string
  taskId: string
  isDone: boolean
  title: string
  onChangeChecked: (e: ChangeEvent<HTMLInputElement>, todoId: string, taskId: string) => void
  changeTaskTitle: (newTitle: string, todoId: string, taskId: string) => void
  removeTask: (todoId: string, taskId: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {

  const { todoId, taskId, isDone, title, onChangeChecked, changeTaskTitle, removeTask } = props;

  const onChangeHandler = (newValue: string) => {
     changeTaskTitle(newValue, todoId, taskId)

   }

  return (
    <li key={taskId}
      className={isDone ? 'isDone' : ''}>
      {/* @ts-ignore */}
      <Checkbox
        checked={isDone}
        onChange={(e) => onChangeChecked(e, todoId, taskId)}
        defaultChecked />

      <EditableSpan
        title={title}
        onChange={onChangeHandler} />

      <Button
        variant="outlined"
        color="error"
        onClick={() => removeTask(todoId, taskId)}>
        x
      </Button>
    </li>
  )
})