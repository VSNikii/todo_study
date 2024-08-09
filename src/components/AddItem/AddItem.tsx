import React, {useState, ChangeEvent, KeyboardEventHandler} from "react";


type AddItemForPropsType = {
  addItem: (text: string) => void
}

export default function AddItemFor (props: AddItemForPropsType) {
  let {addItem} = props

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
    if(newTaskTitle.trim() === ""){
      setError('Поле не может быть пустым');
      return;
    }
      
      addItem(newTaskTitle);
      setNewTaskTitle('');
  }

  return (
    <div>
      <input value={newTaskTitle}
        onChange={onChangeInput}
        onKeyDown={onKeyDownInput}
        className={error ? 'error' : ''} />

      {error && <p className='error-message'>{error}</p>}

      <button onClick={onClickNewTask}>+</button>


    </div>
  );
}