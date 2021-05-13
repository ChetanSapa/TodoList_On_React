import React, { ChangeEvent, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import EditableSpan from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import {Delete} from '@material-ui/icons';
import {TaskType} from './AppWithRedux';

type TaskPropsType = {
    task: TaskType
    changeStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((
    {
        task,
        changeStatus,
        changeTaskTitle,
        removeTask
    }: TaskPropsType) => {
    console.log('EditableSpan')

    const onClickHandler = useCallback(() => removeTask(task.id),[])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(task.id, newIsDoneValue)
    },[])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue)
    },[])

    return (
        <div key={task.id} style={{listStyle: 'none', padding: '0px'}}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeHandler}
                color={'primary'}/>

            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})