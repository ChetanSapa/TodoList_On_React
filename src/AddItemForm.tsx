import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props:AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }

    return(
        <div>
            <TextField
                variant={'outlined'}
                value={title} onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                label={'For wat?'}
                error={!!error}
                helperText={error}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton onClick={addItem} color={'primary'}>
                <AddBox />
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className={'error-text'}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm