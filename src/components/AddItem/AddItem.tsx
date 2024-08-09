import React, { useState, ChangeEvent, KeyboardEventHandler } from "react";
import { Button } from "@mui/material";
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';


type AddItemForPropsType = {
  addItem: (text: string) => void
  labelText: string
}

export default function AddItemFor(props: AddItemForPropsType) {
  let { addItem, labelText } = props

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value);

  const onKeyDownInput = (e: KeyboardEventHandler<HTMLInputElement>) => {
    if (newTaskTitle.trim() === "") {
      setError('Поле не может быть пустым');
      return;
    }
    setError(null);
    if (e.key === 'Enter') {

      addItem(newTaskTitle);
      setNewTaskTitle('');

    }
  }

  const onClickNewTask = () => {
    if (newTaskTitle.trim() === "") {
      setError('Поле не может быть пустым');
      return;
    }

    addItem(newTaskTitle);
    setNewTaskTitle('');
  }

  return (
    <div>
      <TextField id="outlined-basic" label={labelText} variant="outlined"
        value={newTaskTitle}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
        className={error ? 'error' : ''} />
      {error && <p className='error-message'>{error}</p>}

      <Button variant={'contained'} color={'primary'} onClick={onClickNewTask} className="ml-10">+</Button>


    </div>
  );
}