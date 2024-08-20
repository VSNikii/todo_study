import { todolistsReducer } from "./todolists-reducer";
import { v1 as uuidv1 } from 'uuid';
import { FilterValueType, TodoList } from "../AppWithRedux";
import { removeTodoAC, changeFilterTodoAC, addTodoAC, changeTitleTodoAC } from "./todolists-reducer";



test('correct todolist should be removed', () => {
    let todoId1 = uuidv1();
    let todoId2 = uuidv1();

    const startState: Array<TodoList> = [
        { id: todoId1, title: 'What to learn', filter: 'All' },
        { id: todoId2, title: 'What to watch', filter: 'All' }
    ];


    const endState = todolistsReducer(startState, removeTodoAC(todoId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoId2);
    expect(endState[0].title).toBe('What to watch');
})


test('correct todolist should be added', () => {
    let todoId1 = uuidv1();
    let todoId2 = uuidv1();

    let newTodolistTitle = 'New Todolist';
    const startState: Array<TodoList> = [
        { id: todoId1, title: 'What to learn', filter: 'All' },
        { id: todoId2, title: 'What to watch', filter: 'All' }
    ];



    const endState = todolistsReducer(startState, addTodoAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('All');
})


test('correct todolist should be changed title', () => {
    let todoId1 = uuidv1();
    let todoId2 = uuidv1();

    let newTodolistTitle = 'New Todolist';
    const startState: Array<TodoList> = [
        { id: todoId1, title: 'What to learn', filter: 'All' },
        { id: todoId2, title: 'What to watch', filter: 'All' }
    ];


    const endState = todolistsReducer(startState, changeTitleTodoAC(newTodolistTitle, todoId2));

    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
})


test('correct todolist should be changed filter', () => {
    let todoId1 = uuidv1();
    let todoId2 = uuidv1();

    let newFilterValue: FilterValueType = 'Completed';

    const startState: Array<TodoList> = [
        { id: todoId1, title: 'What to learn', filter: 'All' },
        { id: todoId2, title: 'What to watch', filter: 'All' }
    ];

    const endState = todolistsReducer(startState, changeFilterTodoAC(newFilterValue, todoId2));

    
    expect(endState[1].filter).toBe('Completed');
    expect(endState[0].filter).toBe('All');

})