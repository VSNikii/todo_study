import React, { useState, ChangeEvent, KeyboardEventHandler, useReducer, useCallback } from 'react';
import './App.css';
import 'macro-css';
import ToDo from './components/ToDo/ToDo';
import { TasksType } from './components/ToDo/ToDo';
import { v1 as uuidv1 } from 'uuid';
import { AddItemFor } from './components/AddItem/AddItem';
import { addTodoAC, changeFilterTodoAC, changeTitleTodoAC, removeTodoAC, todoId1, todoId2, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeMarkerTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';


export type TodoList = {
    id: string,
    title: string,
    filter: FilterValueType
};

export type FilterValueType = 'All' | 'Completed' | 'Active';

export type TasksStateType = {
    [key: string]: Array<TasksType>
}




function AppWithRedux() {


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodoList>>((state) => state.todolists);



    const changeFilter = useCallback((value: FilterValueType, todoId: string) => {
        const action = changeFilterTodoAC(value, todoId);
        dispatch(action);
    }, [dispatch])

    const removeTodo = useCallback((todoId: string) => {
        const action = removeTodoAC(todoId);
        dispatch(action);
        dispatch(action)
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todoId: string, newTitle: string) => {
        const action = changeTitleTodoAC(newTitle, todoId);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback((text: string) => {

        const action = addTodoAC(text);
        dispatch(action);

    }, [dispatch]);




    return (
        <div className="App clear d-flex flex-column align-center" >
            <AddItemFor
                addItem={addTodolist}
                labelText='Add Todolist'
            />
            <h1>TodoList </h1>
            <div className='d-flex justify-around ml-50 mr-50 align-center' style={{ width: 1000 }}>

                {
                    todolists.map((todo) => {
                        
                        return (
                            <ToDo
                                key={todo.id}
                                title={todo.title}
                                changeFilter={changeFilter}
                                filter={todo.filter}
                                id={todo.id}
                                removeTodo={removeTodo}
                                changeTodolistTitle={changeTodolistTitle}

                            />
                        );
                    })
                }
            </div>
        </div>
    );

}


export default AppWithRedux;

