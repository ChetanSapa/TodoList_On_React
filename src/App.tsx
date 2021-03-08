import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist'

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'complet'

function App() {
    // const tasks: Array<TaskType> = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 1, title: 'JS', isDone: true},
    //     {id: 1, title: 'React.js', isDone: false}
    // ]
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 1, title: 'React.js', isDone: false}
    ])

    function removeTask(taskId: number) {
        const filteredTasks = tasks.filter(t => t.id !==taskId)
        setTasks(filteredTasks)
    }

    // const todoListFilter : FilterValueType = 'all'
    const [todoListFilter, setTodoListFilter] = useState<FilterValueType>('all')

    function changeTodoListFilter(newFilterValue: FilterValueType) {
        setTodoListFilter(newFilterValue)
    }

    function getTasksForTodoList() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "complet":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    // const task1 = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 1, title: 'JS', isDone: true},
    //     {id: 1, title: 'React.js', isDone: true}
    // ]
    //
    // const task2 = [
    //     {id: 1, title: 'Hi there!', isDone: true},
    //     {id: 1, title: 'How are you?', isDone: true},
    //     {id: 1, title: 'You are beautiful!', isDone: true}
    // ]

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
