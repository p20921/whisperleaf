import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import withBreakPoints from 'hoc/BreakPoints'

const useStyles = makeStyles(theme => ({
    buttonBox: {
        display: 'flex',
        gap: 5,
        justifyContent: 'center'
    }
}))

function Main1(props) {
    const { breakpoints } = props
    const { xs } = breakpoints

    const classes = useStyles()

    const { query, push } = useRouter()
    const { category, startpoint, search } = query

    const handleClick = () => {
        push(`/?category=${category || ''}&startpoint=0&search=`)
    }

    return (
        <>
        <Container style={{ marginBottom: 30, marginTop: 20 }}>
            <Typography variant={xs ? 'h4' : 'h2'}  style={{ cursor: 'pointer', textAlign: 'center', fontWeight: 'bold' }} onClick={handleClick}>World News</Typography>
        </Container>
        </>
    )
}

export default withBreakPoints(Main1)