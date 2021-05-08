import React, {useState, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import { todoListsReducer, ChangeTodoListFilterActionCreator, RemoveTodoListActionCreater, ChangeTodoListActionCreator, AddtodolistActionCreater } from './state/todolists-reducer';
import { tasksReducer, removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './state/tasks-reducer';

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

function AppWithReducer() {
    console.log(v1())

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        let action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatchToTasks(action)
        }


    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
    let action = changeTaskTitleAC(taskId, title, todoListID)
        dispatchToTasks(action)
    }

    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
    let action = changeTaskStatusAC(taskId, newIsDone, todoListID)
        dispatchToTasks(action)
    }

    function changeTodoListFilter(newFilterValue: FilterValueType, todoListID: string) {
        dispatchToTodoLists( ChangeTodoListFilterActionCreator(newFilterValue, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListActionCreater(todoListID)
        dispatchToTodoLists(RemoveTodoListActionCreater(todoListID))
        dispatchToTasks(RemoveTodoListActionCreater(todoListID))
    }

    function addTodoList(title: string) {
        let action = AddtodolistActionCreater(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListActionCreator(title, todoListID))
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

export default AppWithReducer;
