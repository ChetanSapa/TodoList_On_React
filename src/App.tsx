import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export type TasksStateType = {
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
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
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

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskId ? {...t, title} : t)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTodoListFilter(newFilterValue: FilterValueType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl))
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(updatedTodoList)
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

    // UI:

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper elevation={6} style={{padding: '20px'}}>
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
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: '20px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
