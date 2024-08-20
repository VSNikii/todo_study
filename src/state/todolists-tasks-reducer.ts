import { TasksStateType, TodoList } from "../AppWithRedux"
import { tasksReducer } from "./tasks-reducer";
import { addTodoAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistState: Array<TodoList> = [];

    const action = addTodoAC('new todolist')
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistState = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTasksState);
    const idFromTodolists = endTodolistState[0].id;
    const idFromTasks = keys[0];

    expect(idFromTasks).toBe(action.todoId);
    expect(idFromTodolists).toBe(action.todoId);
})