import {TodoListType, FilterValueType, TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    todolistId: string
}

export type ChangeStatusActionType = {
    type: 'CHENGE_STATUS',
    taskId: string,
    newIsDone: boolean,
    todolistId: string
}
export type ChangeTitleActionType = {
    type: 'CHENGE_TITLE',
    taskId: string,
    newTitle: string,
    todolistId: string
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | ChangeTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state :TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD_TASK':
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const updatedTasks = [newTask, ...state[action.todolistId]]

            return {...state, [action.todolistId]: updatedTasks}
        case 'CHENGE_STATUS':
            let updatedStatus = state[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.newIsDone
            } : t)
            return {...state, [action.todolistId]: updatedStatus}
        case 'CHENGE_TITLE':
            let updatedTitle = state[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                title: action.newTitle
            } : t)
            return {...state, [action.todolistId]: updatedTitle}
        case 'ADDTODOLIST': {
            return {...state, [action.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHENGE_STATUS', taskId, newIsDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTitleActionType => {
    return {type: 'CHENGE_TITLE', taskId, newTitle, todolistId}
}