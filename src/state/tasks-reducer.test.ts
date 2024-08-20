import { v1 as uuidv1 } from 'uuid';
import { addTaskAC, changeMarkerTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../AppWithRedux';
import { start } from 'repl';
import { addTodoAC, removeTodoAC } from './todolists-reducer';



test('tasks should be correct removed', () => {
    let taskId1 = uuidv1();
    let taskId2 = uuidv1();
    let taskId3 = uuidv1();
    let taskId4 = uuidv1();

    const startState: TasksStateType = {
        ['todolistId1']: [
            { id: taskId1, title: 'JS', isDone: true },
            { id: taskId2, title: 'CSS', isDone: true },
            { id: taskId3, title: 'React', isDone: false },
            { id: taskId4, title: 'Redux', isDone: false },
        ],
        ['todolistId2']: [
            { id: taskId1, title: 'Milk', isDone: false },
            { id: taskId2, title: 'Bread', isDone: true },
            { id: taskId3, title: 'Shocolate', isDone: false },
            { id: taskId4, title: 'Soda', isDone: true },
        ]

    };

    const action = removeTaskAC(taskId3, 'todolistId2');
    const endState = tasksReducer(startState, action);


    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].every(t => t.id != taskId3)).toBeTruthy();

});


test('tasks should be correct added', () => {

    const startState: TasksStateType = {
        ['todolistId1']: [
            { id: uuidv1(), title: 'JS', isDone: true },
            { id: uuidv1(), title: 'CSS', isDone: true },
            { id: uuidv1(), title: 'React', isDone: false },
            { id: uuidv1(), title: 'Redux', isDone: false },
        ],
        ['todolistId2']: [
            { id: uuidv1(), title: 'Milk', isDone: false },
            { id: uuidv1(), title: 'Bread', isDone: true },
            { id: uuidv1(), title: 'Shocolate', isDone: false },
            { id: uuidv1(), title: 'Soda', isDone: true },
        ]
    };

    let newTitle = 'Next.js'
    const action = addTaskAC(newTitle, 'todolistId1');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).not.toBe(6);
    expect(endState['todolistId1'].length).toBe(5);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId1'][0].title).toBe(newTitle);
    expect(endState['todolistId1'][0].isDone).toBe(false);
    expect(endState['todolistId1'][0].id).toBeDefined();
})

test('tasks should be correct changed title', () => {

    const taskId1 = uuidv1();
    const taskId2 = uuidv1();
    const taskId3 = uuidv1();
    const taskId4 = uuidv1();

    const startState: TasksStateType = {
        ['todolistId1']: [
            { id: taskId1, title: 'JS', isDone: true },
            { id: taskId2, title: 'CSS', isDone: true },
            { id: taskId3, title: 'React', isDone: false },
            { id: taskId4, title: 'Redux', isDone: false },
        ],
        ['todolistId2']: [
            { id: taskId1, title: 'Milk', isDone: false },
            { id: taskId2, title: 'Bread', isDone: true },
            { id: taskId3, title: 'Shocolate', isDone: false },
            { id: taskId4, title: 'Soda', isDone: true },
        ]
    };

    const newTaskTitle = 'New Title';
    const action = changeTitleTaskAC(newTaskTitle, 'todolistId1', taskId2);

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId1'][1].title).toBe(newTaskTitle);
    expect(endState['todolistId2'][1].title).toBe('Bread');

})


test('tasks should be correct changed marker', () => {

    const taskId1 = uuidv1();
    const taskId2 = uuidv1();
    const taskId3 = uuidv1();
    const taskId4 = uuidv1();

    const startState: TasksStateType = {
        ['todolistId1']: [
            { id: taskId1, title: 'JS', isDone: true },
            { id: taskId2, title: 'CSS', isDone: true },
            { id: taskId3, title: 'React', isDone: false },
            { id: taskId4, title: 'Redux', isDone: false },
        ],
        ['todolistId2']: [
            { id: taskId1, title: 'Milk', isDone: false },
            { id: taskId2, title: 'Bread', isDone: true },
            { id: taskId3, title: 'Shocolate', isDone: false },
            { id: taskId4, title: 'Soda', isDone: true },
        ]
    };

    const action = changeMarkerTaskAC('todolistId1', taskId3, true);

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][2].isDone).toBe(true)
    expect(endState['todolistId2'][2].isDone).toBe(false);
    expect(endState['todolistId1'][2].title).toBe('React');



})


test('new array should be added when new todolist is added', () => {
    const taskId1 = uuidv1();
    const taskId2 = uuidv1();
    const taskId3 = uuidv1();
    const taskId4 = uuidv1();
    const startState: TasksStateType = {
        ['todolistId1']: [
            { id: taskId1, title: 'JS', isDone: true },
            { id: taskId2, title: 'CSS', isDone: true },
            { id: taskId3, title: 'React', isDone: false },
            { id: taskId4, title: 'Redux', isDone: false },
        ],
        ['todolistId2']: [
            { id: taskId1, title: 'Milk', isDone: false },
            { id: taskId2, title: 'Bread', isDone: true },
            { id: taskId3, title: 'Shocolate', isDone: false },
            { id: taskId4, title: 'Soda', isDone: true },
        ]
    };

    const action = addTodoAC('new todolist');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw new Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([])
});


test('property with todolistId should be deleted', () => {
    const taskId1 = uuidv1();
    const taskId2 = uuidv1();
    const taskId3 = uuidv1();
    const taskId4 = uuidv1();

    const startState: TasksStateType = {
        ['todolistId1']: [
            { id: taskId1, title: 'JS', isDone: true },
            { id: taskId2, title: 'CSS', isDone: true },
            { id: taskId3, title: 'React', isDone: false },
            { id: taskId4, title: 'Redux', isDone: false },
        ],
        ['todolistId2']: [
            { id: taskId1, title: 'Milk', isDone: false },
            { id: taskId2, title: 'Bread', isDone: true },
            { id: taskId3, title: 'Shocolate', isDone: false },
            { id: taskId4, title: 'Soda', isDone: true },
        ]
    };
    const action = removeTodoAC('todolistId2');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});
