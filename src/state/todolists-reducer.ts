import { TodoList } from "../AppWithRedux"
import { v1 as uuidv1} from 'uuid';
import { FilterValueType } from "../AppWithRedux";



export type RemoveTodoActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoId: string
}

export type ChangeTitleTodoActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeFilterTodoActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}


export type ActionTodoTypes = RemoveTodoActionType | AddTodoActionType | ChangeFilterTodoActionType | ChangeTitleTodoActionType

export const todoId1 = uuidv1();
export const todoId2 = uuidv1();


const initialState: Array<TodoList>  = [

]

export const todolistsReducer = (state: Array<TodoList> = initialState, action: ActionTodoTypes): Array<TodoList> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);

        case 'ADD-TODOLIST':
            
            return [{
                id: action.todoId,
                title: action.title,
                filter: 'All'
            }, ...state];

        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title;

            }
            return [...state];

        case 'CHANGE-TODOLIST-FILTER':
            const todolist_filter = state.find(t => t.id === action.id);
            if (todolist_filter) {
                todolist_filter.filter = action.filter
            }
            return [...state]

        default:
            return state;
    }
}





export const removeTodoAC = (todoId: string): RemoveTodoActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoId }
}
export const addTodoAC = (text: string): AddTodoActionType => {
    
    return { type: 'ADD-TODOLIST', title: text, todoId: uuidv1() }
}
export const changeTitleTodoAC = (text: string, todoId: string): ChangeTitleTodoActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: text, id: todoId }
}
export const changeFilterTodoAC = (text: FilterValueType, todoId: string): ChangeFilterTodoActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: text, id: todoId }
}
