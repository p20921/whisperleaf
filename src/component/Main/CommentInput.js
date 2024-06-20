import { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import randomName from 'random-name'
import { ALARM, INIT } from 'reducer/comment_alarm'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

export const commentStorageName = 'comment_ids' 

function CommentInputComponent(props) {
    const { item_id } = props

    const dispatch = useDispatch()

    const [ newValue, setNewValue ] = useState({name: '', content: '' })

    const handleChange = (e) => {
        const { name, value } = e.target

        setNewValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSave = async() => {
        const response = await fetch('/api/set_comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id, name: newValue.name, content: newValue.content })
        })

        const result = await response.json()

        const array = localStorage.getItem(commentStorageName) ? JSON.parse(localStorage.getItem(commentStorageName)) : []

        array.push(result.id)

        localStorage.setItem(commentStorageName, JSON.stringify(array))

        localStorage.setItem('comment-name', newValue.name)

        setNewValue(prevState => ({
            ...prevState,
            content: ''
        }))

        dispatch({ type: ALARM, alarm: Math.random() })
    }

    useEffect(() => {
        setNewValue({ 
            name: localStorage.getItem('comment-name') || randomName.first().substr(0, 10),
            content: ''
        })
    }, [])


    useEffect(() => {
        return () => {
            dispatch({ type: INIT })
        }
    }, [dispatch])

    return (
        <Container style={{ marginTop: 30 }}>
            <Box style={{ display: 'flex', gap: 5 }}>
                <TextField style={{ width: 100 }} name="name" value={newValue.name} inputProps={{ maxLength: 10 }} onChange={handleChange} />
                <TextField style={{ fontSize: 9 }} name="content" value={newValue.content} fullWidth multiline placeholder={'Add comment...'} inputProps={{ maxLength: 3000 }} onChange={handleChange} />
            </Box>
            {
                (newValue.name && newValue.content) && <Button style={{ marginTop: 15 }} fullWidth variant="contained" onClick={handleSave}>Save</Button>
            }
        </Container>

    )
}

export default memo(CommentInputComponent)