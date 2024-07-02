import { memo } from "react"
import moment from 'moment'
import CardHeader from '@material-ui/core/CardHeader'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    root: {
        height: 80
    },
    title: {
        fontSize: 16,
        display: '-webkit-box',
        wordWrap: 'break-word', 
        '-webkitLineClamp': 2,
        '-webkitBoxOrient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    subheader: {
        paddingTop: 5,
        fontSize: 12
    }
}))

function HeaderComponent(props) {
    const { subject, wdate } = props

    const classes = useStyles()

    return <CardHeader classes={classes} title={subject} subheader={moment(wdate).format("MMM Do YY")} />
}

export default HeaderComponent