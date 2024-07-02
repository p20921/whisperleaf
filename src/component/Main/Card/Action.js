import { memo } from "react"
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from "@material-ui/icons/Favorite"
import CommentIcon from "@material-ui/icons/Comment"
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& > div:nth-child(1)': {
            width: 25
        },
        '& > div:nth-child(2)': {
            width: 50
        },
        '& > div:nth-child(3)': {
            width: 28
        },
        '& > div:nth-child(4)': {
            flex: 1
        }
    }
}))

function ActionComponent(props) {
    const { loveCount, commentCount } = props

    const classes = useStyles()

    return (
        <CardActions disableSpacing>
            <Box className={classes.box}>
                <div><FavoriteIcon fontSize="small" color="action" style={{ display: 'block' }} /></div>
                <div><Typography variant="caption" color="textSecondary">{loveCount}</Typography></div>
                <div><CommentIcon fontSize="small" color="action" style={{ display: 'block' }} /></div>
                <div><Typography variant="caption" color="textSecondary">{commentCount}</Typography></div>
            </Box>
        </CardActions>
    )
}

export default memo(ActionComponent)