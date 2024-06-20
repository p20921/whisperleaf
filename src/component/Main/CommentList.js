import { memo, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CommentItemComponent from './CommentItem'
import { commentStorageName } from './CommentInput'

function CommentListComponent(props) {
    const { item_id } = props

    const [ rows, setRows ] = useState([])

    const [ myComments, setMyComments ] = useState([])


    const states = useSelector(states => states.commentAlarm)
    const { alarm } = states

    const handleRemove = useCallback(async(comment_id) => {
        await fetch('/api/remove_comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment_id })
        })

        setRows(prevState => prevState .filter(c => c.comment_id !== comment_id))
    }, [])

    useEffect(() => {
        const Doing = async() => {
            const res = await fetch(`/api/get_comment?item_id=${item_id}`)
            const data = await res.json()
            

            setRows(data.rows)
        }
        Doing()
    }, [item_id])

    useEffect(() => {
        const Doing = async() => {
            const res = await fetch(`/api/get_comment?item_id=${item_id}`)
            const data = await res.json()
            

            setRows(data.rows)
        }
        if (alarm > 0) Doing()
    }, [item_id, alarm])

    useEffect(() => {
        setMyComments(localStorage.getItem(commentStorageName) ? JSON.parse(localStorage.getItem(commentStorageName)) : [])
    }, [alarm])

    return (
        <Container style={{ marginTop: 30 }}>
            <Box>
                {
                    rows.map(c => <CommentItemComponent key={c.comment_id} comment_id={c.comment_id} name={c.name} content={c.content} wdate={c.wdate} myComments={myComments} onRemove={handleRemove} />)
                }
            </Box>
        </Container>
    )
}

export default memo(CommentListComponent)
