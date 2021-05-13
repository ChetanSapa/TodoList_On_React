import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm';
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {  ChangeTodoListFilterActionCreator, RemoveTodoListActionCreater, ChangeTodoListActionCreator, AddtodolistActionCreater } from './state/todolists-reducer';
import { removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './state/tasks-reducer';
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
    console.log("AppWithRedux")

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTask  = useCallback((title: string, todoListID: string) => {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
        }, [dispatch])


    const changeTaskTitle  = useCallback((taskId: string, title: string, todoListID: string) => {
    let action = changeTaskTitleAC(taskId, title, todoListID)
        dispatch(action)
    },[dispatch])

    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean, todoListID: string) => {
    let action = changeTaskStatusAC(taskId, newIsDone, todoListID)
        dispatch(action)
    },[dispatch])

    const changeTodoListFilter = useCallback((newFilterValue: FilterValueType, todoListID: string) => {
        dispatch( ChangeTodoListFilterActionCreator(newFilterValue, todoListID))
    },[dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListActionCreater(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddtodolistActionCreater(title)
        dispatch(action)
    },[dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListActionCreator(title, todoListID))
    }, [dispatch])


    // UI:

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '20px'}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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
