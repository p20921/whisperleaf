import { memo } from "react"
import moment from 'moment'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function SubjectComponent(props) {
    const { subject, wdate } = props

    return (
        <Container style={{ marginTop: 100 }}>
            <Typography variant="h4" style={{ fontWeight: 900 }}>{subject}</Typography>
            <Typography variant="caption" color="textSecondary">{moment(wdate).calendar()}</Typography>
        </Container>

    )
}

export default memo(SubjectComponent)