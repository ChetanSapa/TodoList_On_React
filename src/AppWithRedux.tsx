import React, {useState, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import { todoListsReducer, ChangeTodoListFilterActionCreator, RemoveTodoListActionCreater, ChangeTodoListActionCreator, AddtodolistActionCreater } from './state/todolists-reducer';
import { tasksReducer, removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './state/tasks-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './state/store';

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

function AppWithRedux() {
    console.log(v1())

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()


    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
        }


    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
    let action = changeTaskTitleAC(taskId, title, todoListID)
        dispatch(action)
    }

    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
    let action = changeTaskStatusAC(taskId, newIsDone, todoListID)
        dispatch(action)
    }

    function changeTodoListFilter(newFilterValue: FilterValueType, todoListID: string) {
        dispatch( ChangeTodoListFilterActionCreator(newFilterValue, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListActionCreater(todoListID)
        dispatch(RemoveTodoListActionCreater(todoListID))
    }

    function addTodoList(title: string) {
        let action = AddtodolistActionCreater(title)
        dispatch(action)
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodoListActionCreator(title, todoListID))
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

export default AppWithRedux;
