import React, {useState, ChangeEvent, useCallback} from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value),[])
    return(
        editMode
            ? <TextField color={'primary'} variant={'standard'} value={title} onBlur={offEditMode} autoFocus onChange={changeTitle} />
            // ? <input value={title} onBlur={offEditMode} autoFocus onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

export default EditableSpan