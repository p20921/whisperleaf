import { memo } from 'react'
import oc from 'open-color'
import HtmlParser from 'react-html-parser'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    cover: (props) => {
        const { thumbnail } = props

        return {
            backgroundImage: `url('${thumbnail}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            margin: 0,
            padding: 0,
            height: 500,
            width: '100%',
            borderRadius: 5,
            marginBottom: 50,
            [theme.breakpoints.down('xs')]: {
                height: 300
            }
        }

    }
}))

function BodyComponent(props) {
    const { subject, thumbnail, content } = props

    const classes = useStyles({ thumbnail })

    let newContent = content ? content.replace(/\n/g, '') : ''

    return (
        <Container style={{ marginTop: 30, marginBottom: 10 }}>
            {/*<Box className={classes.cover} />*/}
            <img src={thumbnail} alt={subject} style={{ maxWidth: '100%'}} />
            <Typography component="div" className="Content"  style={{ color: oc.gray[7], minHeight: 100, wordBreak: 'break-all' }}>{HtmlParser(newContent)}</Typography>
        </Container>
    )
}

export default memo(BodyComponent)
