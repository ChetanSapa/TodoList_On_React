import {todoListsReducer, ChangeTodoListFilterActionType, ChangeTodoListActionType, RemoveTodoListActionCreater} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType, FilterValueType} from '../App';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListActionCreater(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, { type: 'ADDTODOLIST', title: newTodolistTitle, id:todolistId1})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListActionType = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        todoListID: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilterValue: FilterValueType = "complet";

    const action: ChangeTodoListFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID: todolistId2,
        newFilterValue: newFilterValue
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilterValue);
});
