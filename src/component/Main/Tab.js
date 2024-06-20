import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import withBreakPoints from 'hoc/BreakPoints'

const useStyles = makeStyles(theme => ({
    buttonBox: {
        display: 'flex',
        gap: 5,
        justifyContent: 'center'
    }
}))

/**
 * 
 * middle_east, usa, europe, asia
 * @returns 
 */
function Main1(props) {
    const { category, breakpoints } = props
    const { xs } = breakpoints

    const router = useRouter()

    const { query, push } = router
    const { search } = query

    const classes = useStyles()

    const handleChange = (val) => {
        push(`/?category=${val}&startpoint=0&search=${search || ''}`)
    }

    return (
        <>
        <Container>
            <Box className={classes.buttonBox}>
                <Button size={xs ? 'small' : 'medium'} variant="contained" color={category === 'middle_east' ? 'primary' : 'default'} onClick={() => handleChange('middle_east')}>Middle East</Button>
                <Button size={xs ? 'small' : 'medium'} variant="contained" color={category === 'usa' ? 'primary' : 'default'} onClick={() => handleChange('usa')}>USA</Button>
                <Button size={xs ? 'small' : 'medium'} variant="contained" color={category === 'europe' ? 'primary' : 'default'} onClick={() => handleChange('europe')}>EUROPE</Button>
                <Button size={xs ? 'small' : 'medium'} variant="contained" color={category === 'asia' ? 'primary' : 'default'} onClick={() => handleChange('asia')}>Asia</Button>
            </Box>
        </Container>
        </>
    )
}

export default withBreakPoints(Main1)