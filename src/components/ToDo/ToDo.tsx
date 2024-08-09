import { FilterValueType } from '../../App';
import './toDo.module.scss';
import React, { ChangeEventHandler, ChangeEvent, KeyboardEventHandler, useState } from 'react';
import AddItemFor from '../AddItem/AddItem';
import EditableSpan from '../EditableSpan/EditableSpan';


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
    <div>
      <h3><EditableSpan title={title} onChange={changeTodolistTitle}/><button onClick={() => removeTodoList(id)}>x</button></h3>
      <AddItemFor 
      addItem={addItem}
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
            return <li key={item.id} className={item.isDone ? 'isDone' : '' }><input type={"checkbox"} checked={item.isDone} onChange={onChangeChecked} /><EditableSpan title={item.title} onChange={onChangeTitle}/><button onClick={() => onClickRemove(item)}>x</button></li>
          })
        }

      </ul>
      <div>
        <button className={filter === 'All' ? 'active-filter' : '' } onClick={onAllClick}>All</button>
        <button className={filter === 'Active' ? 'active-filter' : '' } onClick={onActiveClick}>Active</button>
        <button className={filter === 'Completed' ? 'active-filter' : '' } onClick={onCompletedClick}>Completed</button>
      </div>
    </div>
  );
}

export default ToDo;

