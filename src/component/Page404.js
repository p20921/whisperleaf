import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

function Page404() {
    return (
        <Container>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 100 }}>
                <Typography color="primary" variant="h5">Oooooops! 404</Typography>
                <Link href="/">
                    <Button color="primary" variant="contained" style={{ marginTop: 25 }} size="large">Go Home!</Button>                
                </Link>
            </Box>
        </Container>
    )
}

export default Page404 