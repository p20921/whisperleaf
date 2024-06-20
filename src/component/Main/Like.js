import { memo, useState, useEffect } from 'react'
import { cookies } from 'utils'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

function LikeComponent(props) {
    const { item_id, like } = props

    const cookieName = `like-${item_id}`
    const [ isLike, setIsLike ] = useState(false)
    const [ likeCount, setLikeCount ] = useState(like || 0) 

    const handleClick = async() => {
        if (isLike) {
            const res = await fetch(`/api/set_like?item_id=${item_id}&sign=0`)
            const count = Number(await res.json())
            setIsLike(false)
            cookies.set({ value: `${cookieName}=0`, maxAge: 60 * 60 * 24 * 365 * 10 })
            setLikeCount(count)
        } else {
            const res = await fetch(`/api/set_like?item_id=${item_id}&sign=1`)
            const count = Number(await res.json())
            setIsLike(true)
            cookies.set({ value: `${cookieName}=1`, maxAge: 60 * 60 * 24 * 365 * 10 })
            setLikeCount(count)
        }
    }

    useEffect(() => {
        setIsLike(cookies.get(cookieName) === "1")
    }, [cookieName])

    useEffect(() => {
        setLikeCount(like || 0)
    }, [like])

    return (
        <Container>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {
                    isLike ? <FavoriteIcon color="secondary" style={{ cursor: 'pointer' }} onClick={handleClick} /> : <FavoriteBorderIcon color="action" style={{ cursor: 'pointer' }} onClick={handleClick} />
                }
                <Typography variant="caption" color="textSecondary">{likeCount ? `+ ${likeCount}` : ''}</Typography>
            </Box>
        </Container>
    )
}

export default memo(LikeComponent)