import { memo, useEffect } from "react"
import moment from 'moment'
import { Element, scroller as animateScroller } from 'react-scroll'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { TextField } from "@material-ui/core"

function SubjectComponent(props) {
    const { subject, wdate, rand } = props

    useEffect(() => {
        if (rand > 0) {
            animateScroller.scrollTo('myScrollToElement', {
                duration: 800,
                delay: 10,
                smooth: true,
                offset: -50
            })
        }
    }, [rand])

    return (
        <Container  style={{ marginTop: 100 }}>
            <Element name="myScrollToElement" />
            <Typography variant="h4" style={{ fontWeight: 900 }}>{subject}</Typography>
            <Typography variant="caption" color="textSecondary">{moment(wdate).calendar()}</Typography>
        </Container>

    )
}

export default memo(SubjectComponent)