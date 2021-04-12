import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist'
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'complet'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    console.log(v1())

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_1, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React.js', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meet', isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask = {
            id: v1(),
            title,                        //если параметр функции и значение свойства совпадают. title: title = title
            isDone: false
        }
        // const newTasks = [task, ...tasks] //добавляет task в начало коппии массива tasks
                                          //[...tasks, task] добавляет  task в конец коппии массива tasks

        const updatedTasks = [newTask, ...tasks[todoListID]]

        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })

        // еще вариант функции function addTask
        //function addTask(title: string) {
        //setTasks([{
        //id: v1(),
        //title,
        //isDone: false
        // }, ...tasks])}
        //
    }

    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => {
            if (t.id === taskId) {
                return {...t, isDone: newIsDone}
            }
            return t
        })
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTodoListFilter(newFilterValue: FilterValueType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue}: tl))
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "complet":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                  return (
                      <Todolist
                          key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          tasks={getTasksForTodoList(tl)}
                          addTask={addTask}
                          removeTodoList={removeTodoList}
                          removeTask={removeTask}
                          todoListFilter={tl.filter}
                          changeTaskStatus={changeTaskStatus}
                          changeTodoListFilter={changeTodoListFilter}
                      />
                  )
                })
            }

        </div>
    );
}

export default App;
