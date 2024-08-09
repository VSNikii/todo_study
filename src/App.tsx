import React, { useState, ChangeEvent, KeyboardEventHandler } from 'react';
import './App.css';
import 'macro-css';
import ToDo from './components/ToDo/ToDo';
import { TasksType } from './components/ToDo/ToDo';
import { v1 as uuidv1 } from 'uuid';
import AddItemFor from './components/AddItem/AddItem';


export type TodoList = {
  id: string,
  title: string,
  filter: FilterValueType
};
export type FilterValueType = 'All' | 'Completed' | 'Active';

type TasksStateType = {
  [key: string]: Array<TasksType>
}

function App() {
  const todoId1 = uuidv1();
  const todoId2 = uuidv1();


  let [todoLists, setTodoLists] = useState<Array<TodoList>>([
    { id: todoId1, title: 'What to learn', filter: 'All' },
    { id: todoId2, title: 'What to watch', filter: 'All' },
  ]);


  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoId1]: [
      { id: uuidv1(), title: "CSS", isDone: true },
      { id: uuidv1(), title: "JS", isDone: true },
      { id: uuidv1(), title: "React", isDone: false },
      { id: uuidv1(), title: "Redux", isDone: false }
    ],
    [todoId2]: [
      { id: uuidv1(), title: "Spider-Man", isDone: true },
      { id: uuidv1(), title: "Iron-Man", isDone: false },
      { id: uuidv1(), title: "Driver", isDone: false }
    ]
  });


  const addTask = (text: string, todoId: string) => {
    let tasks = tasksObj[todoId];
    let newTask = { id: uuidv1(), title: text, isDone: false };
    let newTasks = [newTask, ...tasks];
    tasksObj[todoId] = newTasks;
    setTasksObj({ ...tasksObj });
  }

  const changeStatus = (taskId: string, isDone: boolean, todoId: string) => {
    let tasks = tasksObj[todoId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;

      setTasksObj({ ...tasksObj });
    }
  }

  const removeTask = (id: string, todoId: string) => {
    let tasks = tasksObj[todoId];
    let filteredTask = tasks.filter(task => task.id !== id);
    tasksObj[todoId] = filteredTask;
    setTasksObj({ ...tasksObj });
  }

  const changeFilter = (value: FilterValueType, todoId: string) => {
    let todoList = todoLists.find(todo => todo.id === todoId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }


  const removeTodo = (todoId: string) => {
    let filteredTodo = todoLists.filter(todo => todo.id !== todoId);
    setTodoLists(filteredTodo);
    delete tasksObj[todoId];
    setTasksObj({ ...tasksObj })
  }
  const changeTaskTitle = (taskId: string, newTitle: string, todoId: string) => {
    let tasks = tasksObj[todoId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.title = newTitle;

      setTasksObj({ ...tasksObj });
    }
  }

  const changeTodolistTitle = (todoId: string, newTitle: string) => {
    const todoList = todoLists.find(todo => todo.id === todoId);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists])
    }
  }

  function addTodolist(text: string) {
    let todoList: TodoList = {
      id: uuidv1(),
      filter: 'All',
      title: text
    }
    setTodoLists([todoList, ...todoLists]);
    setTasksObj({
      ...tasksObj,
      [todoList.id]: []
    })
  }

  return (
    <div className="App clear d-flex flex-column align-center">
      <AddItemFor
        addItem={addTodolist}
        labelText='Add Todolist' />
      <h1>TodoList</h1>
      <div className='d-flex justify-around ml-50 mr-50 align-center' style={{width: 1000}}>
        {
          todoLists.map((todo) => {
            let tasksForTodoList = tasksObj[todo.id];

            if (todo.filter === 'Completed') {
              tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true);
            }

            if (todo.filter === 'Active') {
              tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false);
            }

            return (

              <ToDo
                key={todo.id}
                title={todo.title}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={todo.filter}
                id={todo.id}
                removeTodo={removeTodo}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}

              />

            );
          })
        }
      </div>
    </div>
  );

}


export default App;

