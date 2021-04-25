import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {IconButton, Button, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


export type TodoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValueType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const allFilterValue = () => {
        props.changeTodoListFilter('all', props.id)
    }
    const activeFilterValue = () => {
        props.changeTodoListFilter('active', props.id)
    }
    const completFilterValue = () => {
        props.changeTodoListFilter('complet', props.id)
    }
    const addTask = (title: string) => props.addTask(title, props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return (
            <li key={t.id} >
                <Checkbox checked={t.isDone} onChange={changeStatus} color={'primary'} />


                {/*<input type='checkbox'*/}
                {/*       checked={t.isDone}*/}
                {/*       onChange={changeStatus}*/}
                {/*/>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>
                {/*<button onClick={removeTask}>X*/}
                {/*</button>*/}
            </li>
        )
    })

    return (
        <div >
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
                {/*<button onClick={removeTodoList}>x</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {tasks}
            </ul>
            <div >
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.todoListFilter === 'all' ? 'outlined' : 'contained'}
                    // className={props.todoListFilter === 'all' ? 'active-filter' : ''}
                    onClick={allFilterValue}>All
                </Button>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.todoListFilter === 'active' ? 'outlined' : 'contained'}
                    // className={props.todoListFilter === 'active' ? 'active-filter' : ''}
                    onClick={activeFilterValue}>Active
                </Button>
                <Button
                    size={'small'}
                    color={'primary'}
                    variant={props.todoListFilter === 'complet' ? 'outlined' : 'contained'}
                    // className={props.todoListFilter === 'complet' ? 'active-filter' : ''}
                    onClick={completFilterValue}>Completed
                </Button>
            </div>
        </div>
    )
}

