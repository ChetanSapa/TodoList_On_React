import React from 'react';
import {FilterValueType, TaskType} from './App'


export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTodoListFilter: (newFilterValue: FilterValueType) => void
}

export function Todolist(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type='checkbox' checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id)}>X</button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks}

            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodoListFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter('complet')
                }}>Completed
                </button>
            </div>
        </div>
    )
}

