import { memo } from "react"
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    content: {
        display: '-webkit-box',
        wordWrap: 'break-word', 
        '-webkitLineClamp': 5,
        '-webkitBoxOrient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}))

function SummaryComponent(props) {
    const { summary } = props

    const classes = useStyles()

    return (
        <CardContent style={{ height: 125 }}>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.content}>{summary}</Typography>
        </CardContent>
    )
}

export default memo(SummaryComponent)