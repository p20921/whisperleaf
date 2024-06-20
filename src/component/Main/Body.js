import { memo } from 'react'
import oc from 'open-color'
import HtmlParser from 'react-html-parser'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function BodyComponent(props) {
    const { content } = props

    return (
        <Container style={{ marginTop: 30, marginBottom: 10 }}>
            <Typography style={{ color: oc.gray[7], minHeight: 100, wordBreak: 'break-all', fontSize: 16 }}>{HtmlParser(content)}</Typography>
        </Container>
    )
}

export default memo(BodyComponent)
