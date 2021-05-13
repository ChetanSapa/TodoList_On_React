import React, {useCallback} from 'react';
import {FilterValueType, TaskType} from './App'
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {IconButton, Button} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppRootStateType } from './state/store';
// import { TodoListType } from './AppWithReducer';
import { Task } from './Task';


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

export const Todolist = React.memo((props: TodoListPropsType) => {

    console.log("todolist")
    // let todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(el => el.id === props.id)[0])
    // let task = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    //
    // let dispatch = useDispatch()

    const allFilterValue = useCallback(() => {
        props.changeTodoListFilter('all', props.id)
    },[props.changeTodoListFilter, props.id])
    const activeFilterValue = useCallback(() => {
        props.changeTodoListFilter('active', props.id)
    },[props.changeTodoListFilter, props.id])
    const completFilterValue = useCallback(() => {
        props.changeTodoListFilter('complet', props.id)
    },[props.changeTodoListFilter, props.id])
    const addTask = useCallback((title: string) => props.addTask(title, props.id),[props.addTask, props.id])
    const removeTodoList = useCallback(() => props.removeTodoList(props.id),[props.removeTodoList, props.id])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.id),
        [props.changeTodoListTitle])

    let taskForTodoList = props.tasks

    if (props.todoListFilter === "active") {
        taskForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.todoListFilter === "complet") {
        taskForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    const removeTask = (taskId: string) => props.removeTask(taskId, props.id)
    // const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(taskId.id, e.currentTarget.checked, props.id)
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id)
    const changeTaskTitle = (taskId: string, newValue: string) => props.changeTaskTitle(taskId, newValue, props.id)


    return (
        <div >
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
                <div>
                    {
                        taskForTodoList.map(t => <Task
                            key={t.id}
                            task={t}
                            removeTask={removeTask}
                            changeStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />)
                    }
                </div>
            <div style={{padding: '10px'}}>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.todoListFilter === 'all' ? 'outlined' : 'contained'}
                    onClick={allFilterValue}>All
                </Button>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.todoListFilter === 'active' ? 'outlined' : 'contained'}
                    onClick={activeFilterValue}>Active
                </Button>
                <Button
                    size={'small'}
                    color={'primary'}
                    variant={props.todoListFilter === 'complet' ? 'outlined' : 'contained'}
                    onClick={completFilterValue}>Completed
                </Button>
            </div>
        </div>
    )
})

