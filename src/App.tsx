import React from 'react';
import './App.css';
import {Todolist} from './Todolist'

function App() {

    const task1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 1, title: 'React.js', isDone: true}
    ]

    const task2 = [
        {id: 1, title: 'Hi there!', isDone: true},
        {id: 1, title: 'How are you?', isDone: true},
        {id: 1, title: 'You are beautiful!', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={task1}/>
            <Todolist title={'What to do'} tasks={task2}/>
        </div>
    );
}

export default App;
