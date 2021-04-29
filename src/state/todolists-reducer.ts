import { TodoListType, FilterValueType } from "../App";
import { v1 } from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListActionType = {
    type: 'ADDTODOLIST'
    title: string
    id: string
}

export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    newFilterValue: FilterValueType
    todoListID: string
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADDTODOLIST":
            const newTodoListId = action.id
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilterValue} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListActionCreater = (todoListID: string) : RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST',todoListID}
}
export const AddtodolistActionCreater = (title: string) : AddTodoListActionType => {
    return {type: 'ADDTODOLIST', title, id: v1()}
}
export const ChangeTodoListActionCreator = (title: string, todoListID: string) : ChangeTodoListActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID}
}
export const ChangeTodoListFilterActionCreator = (newFilterValue: FilterValueType,todoListID: string) : ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', newFilterValue, todoListID}
}
