import { v1 as uuidv1 } from "uuid"
import { TasksStateType } from "../AppWithRedux"
import { AddTodoActionType, RemoveTodoActionType, todoId1, todoId2 } from "./todolists-reducer"



export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoId: string,
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoId: string
}

export type ChangeMarkerTaskActionType = {
    type: 'CHANGE-TASK-MARKER',
    taskId: string,
    todoId: string,
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    taskId: string,
    todoId: string
}

export type ActionTaskTypes = RemoveTaskActionType |
    AddTaskActionType |
    ChangeMarkerTaskActionType |
    ChangeTaskTitleActionType |
    AddTodoActionType |
    RemoveTodoActionType

const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTaskTypes): TasksStateType => {

    switch (action.type) {

        case 'ADD-TASK':
            const stateAddCopy = state[action.todoId];
            const newTask = { id: uuidv1(), title: action.title, isDone: false }
            const newTaskTodo = [newTask, ...stateAddCopy];
            state[action.todoId] = newTaskTodo
            return { ...state};

        case 'REMOVE-TASK':
            const stateRemoveCopy = { ...state };
            const tasks = state[action.todoId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateRemoveCopy[action.todoId] = filteredTasks;
            return stateRemoveCopy;

        case 'CHANGE-TASK-MARKER':
           const todolistTasks = state[action.todoId];
           state[action.todoId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state})

        case 'CHANGE-TASK-TITLE':
            const stateChangeTitleCopy = state[action.todoId];
            state[action.todoId] = stateChangeTitleCopy
                .map(t => t.id === action.taskId 
                    ? {...t, title: action.title} 
                    :t);

            return ({ ...state });

        case 'ADD-TODOLIST':
            
            const stateAddTodoCopy = { ...state };
            stateAddTodoCopy[action.todoId] = []

            return stateAddTodoCopy;

        case 'REMOVE-TODOLIST':
            const stateRemoveTodoCopy = {...state};
            delete stateRemoveTodoCopy[action.id];
            return stateRemoveTodoCopy;

        default:
            return state;
    }

}

export const removeTaskAC = (taskId: string, todoId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todoId: todoId }
}

export const addTaskAC = (text: string, todoId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title: text, todoId: todoId }
}

export const changeTitleTaskAC = (text: string, todoId: string, taskId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title: text, todoId: todoId, taskId: taskId }
}
export const changeMarkerTaskAC = (todoId: string, taskId: string, isDone: boolean): ChangeMarkerTaskActionType => {
    return { type: 'CHANGE-TASK-MARKER', isDone: isDone, todoId: todoId, taskId: taskId }
}