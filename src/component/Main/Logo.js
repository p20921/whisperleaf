import { useRouter } from 'next/router'
import oc from 'open-color'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withBreakPoints from 'hoc/BreakPoints'


function Main1(props) {
    const { breakpoints } = props
    const { xs } = breakpoints

    const { query, push } = useRouter()
    const { category, startpoint, search } = query

    const handleClick = () => {
        push(`/?category=${category || ''}&startpoint=0&search=`)
    }

    return (
        <Container style={{ marginTop: 50 }}>
            <Typography 
                variant={xs ? 'h4' : 'h2'}  
                style={{ 
                    cursor: 'pointer', 
                    textAlign: 'center', 
                    fontWeight: 'bold',
                    textShadow: `2px 2px 5px #A8A684`,
                    color: '#8A8667'
                }} 
                color="primary" 
                onClick={handleClick}
            >
                Whisperleaf
            </Typography>
        </Container>
    )
}

export default withBreakPoints(Main1)