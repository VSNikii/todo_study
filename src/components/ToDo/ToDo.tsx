import { FilterValueType } from '../../App';
import './toDo.module.scss';
import React, { ChangeEventHandler, ChangeEvent, KeyboardEventHandler, useState } from 'react';
import AddItemFor from '../AddItem/AddItem';
import EditableSpan from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
};


export type PropsType = {
  title: string,
  tasks: Array<TasksType>,
  removeTask: (id: string, todoId: string) => void,
  changeFilter: (value: FilterValueType, todoId: string) => void
  addTask: (text: string, todoId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoId: string) => void
  filter: FilterValueType
  id: string
  removeTodo: (todoId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todoId: string) => void
  changeTodolistTitle: (todoId: string, newTitle: string) => void

};



function ToDo(props: PropsType) {
  const { title, tasks, removeTask, changeFilter, addTask, changeStatus, filter, id, removeTodo, changeTaskTitle } = props;




  const onAllClick = () => {
    changeFilter('All', id);
  }
  const onActiveClick = () => {
    changeFilter('Active', id);
  }
  const onCompletedClick = () => {
    changeFilter('Completed', id);
  }


  const removeTodoList = (id: string) => {
    removeTodo(id);
  }
  const addItem = (text: string) => {
    addTask(text, id);
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(id, newTitle)
  }
  return (
    <div className=''>
      <h3 className='d-flex align-center'>
        <EditableSpan title={title} onChange={changeTodolistTitle} /><DeleteIcon onClick={() => removeTodoList(id)} />
      </h3>
      <AddItemFor
        addItem={addItem}
        labelText={'Add Task'}
      />
      <ul>

        {
          tasks.map((item) => {
            const onClickRemove = (item: TasksType) => {
              removeTask(item.id, id);
            }
            const onChangeChecked = (e: ChangeEventHandler<HTMLInputElement>) => {
              changeStatus(item.id, e.target.checked, id);
              console.log(e.target.checked);
            }
            const onChangeTitle = (newValue: string) => {
              changeTaskTitle(item.id, newValue, id);
            }
            return <li key={item.id}
              className={item.isDone ? 'isDone' : ''}>

              <Checkbox checked={item.isDone} onChange={onChangeChecked} defaultChecked />
              <EditableSpan title={item.title} onChange={onChangeTitle} />
              
              <Button variant="outlined" color="error" onClick={() => onClickRemove(item)}>
                x
              </Button>
            </li>
          })
        }

      </ul>
      <div>

        <Tab label={'All'} className={filter === 'All' ? 'active-filter' : ''} onClick={onAllClick} />
        <Tab label={'Active'} className={filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClick} />
        <Tab label={'Completed'} className={filter === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClick} />
      </div>
    </div>
  );
}

export default ToDo;

