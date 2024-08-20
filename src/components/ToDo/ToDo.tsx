import './toDo.module.scss';
import React, { ChangeEventHandler, useCallback } from 'react';
import { AddItemFor } from '../AddItem/AddItem';
import EditableSpan from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import Tab from '@mui/material/Tab';
import { useSelector } from 'react-redux';
import { addTaskAC, changeMarkerTaskAC, changeTitleTaskAC, removeTaskAC } from '../../state/tasks-reducer';
import { AppRootState } from '../../state/store';
import { FilterValueType } from '../../AppWithRedux';
import { useDispatch } from 'react-redux';
import { Task } from '../Task/Task';


export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
};


export type PropsType = {
  title: string,
  changeFilter: (value: FilterValueType, todoId: string) => void
  filter: FilterValueType
  id: string
  removeTodo: (todoId: string) => void
  changeTodolistTitle: (todoId: string, newTitle: string) => void

};



const ToDo = React.memo((props: PropsType) => {


  const { title, changeFilter, filter, id, removeTodo }: PropsType = props;

  const tasks = useSelector<AppRootState, Array<TasksType>>((state) => state.tasks[id]);
  const dispatch = useDispatch();

  const addTask = useCallback((text: string) => {
    dispatch(addTaskAC(text, id))
  }, [dispatch]);

  const onChangeChecked = useCallback((e: ChangeEventHandler<HTMLInputElement>, todoId: string, taskId: string) => {
    let newIsDoneValue: boolean = e.target.checked;
    dispatch(changeMarkerTaskAC(todoId, taskId, newIsDoneValue))
  }, [dispatch]);

  const removeTask = useCallback((todoId: string, taskId: string) => {
    dispatch(removeTaskAC(taskId, todoId))
  }, [dispatch]);

  const changeTaskTitle = useCallback((newTitle: string, todoId: string, taskId: string) => {
    dispatch(changeTitleTaskAC(newTitle, todoId, taskId));
  }, [dispatch]);


  const removeTodoList = useCallback((id: string) => {
    removeTodo(id);
  }, [removeTodo, id])

  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(id, newTitle)
  }, [props.changeTodolistTitle, id]);

  const onAllClick = useCallback(() => {
    changeFilter('All', id);
  }, [changeFilter, id])

  const onActiveClick = useCallback(() => {
    changeFilter('Active', id);
  }, [changeFilter, id])

  const onCompletedClick = useCallback(() => {
    changeFilter('Completed', id);
  }, [changeFilter, id])




  let tasksForTodoList = tasks;

  if (filter === 'Completed') {
    tasksForTodoList = tasks.filter(task => task.isDone === true);
  }

  if (filter === 'Active') {
    tasksForTodoList = tasks.filter(task => task.isDone === false);
  }
  return (
    <div className=''>
      <h3 className='d-flex align-center'>
        <EditableSpan title={title} onChange={changeTodolistTitle} /><DeleteIcon onClick={() => removeTodoList(id)} />
      </h3>
      <AddItemFor
        addItem={addTask}
        labelText={'Add Task'}
      />
      <ul>

        {

          tasksForTodoList.map((item: any) => <Task
            key={id}
            todoId={id}
            taskId={item.id}
            isDone={item.isDone}
            title={item.title}
            onChangeChecked={onChangeChecked}
            removeTask={removeTask}
            changeTaskTitle={changeTaskTitle}

             />)

        }



      </ul>
      <div>

        <Tab label={'All'} className={filter === 'All' ? 'all-filter' : ''} onClick={onAllClick} />
        <Tab label={'Active'} className={filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClick} />
        <Tab label={'Completed'} className={filter === 'Completed' ? 'completed-filter' : ''} onClick={onCompletedClick} />
      </div>
    </div>
  );
});

export default ToDo;


