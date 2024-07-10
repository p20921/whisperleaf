import { memo } from "react"
import CardMedia from '@material-ui/core/CardMedia'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
}))

function ThumbnailComponent(props) {
    const { subject, thumbnail } = props

    const classes = useStyles()

    return <CardMedia className={classes.media} image={thumbnail} title={subject} component="div" alt={subject} />
}

export default memo(ThumbnailComponent)