import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App'


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
}

export function Todolist(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const allFilterValue = () => {
        props.changeTodoListFilter('all', props.id)
    }
    const activeFilterValue = () => {
        props.changeTodoListFilter('active', props.id)
    }
    const completFilterValue = () => {
        props.changeTodoListFilter('complet', props.id)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title, props.id)
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return (
            <li key={t.id}>
                <input type='checkbox'
                       checked={t.isDone}
                       onChange={changeStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>X
                </button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-text'}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.todoListFilter === 'all' ? 'active-filter' : ''}
                    onClick={allFilterValue}>All
                </button>
                <button
                    className={props.todoListFilter === 'active' ? 'active-filter' : ''}
                    onClick={activeFilterValue}>Active
                </button>
                <button
                    className={props.todoListFilter === 'complet' ? 'active-filter' : ''}
                    onClick={completFilterValue}>Completed
                </button>
            </div>
        </div>
    )
}

