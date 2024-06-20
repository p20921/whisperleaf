import { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DirectionsIcon from '@material-ui/icons/Directions'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 365,
        margin: '0 auto',
        marginTop: 30
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 18,
        margin: 4,
    },
}));


export default function CustomizedInputBase() {
    const classes = useStyles()

    const router = useRouter()

    const { query, push } = router
    const { category, search } = query

    const [ newSearch, setNewSearch ] = useState(search || '')

    const handleChange = (e) => {
        const { value } = e.target
        setNewSearch(value)
    }

    const handleSubmit = () => {
        push(`/?category=${category || ''}&startpoint=0&search=${newSearch}`)
    }

    return (
        <Container>
            <Paper component="form" className={classes.root}>
                <InputBase
                    value={newSearch}
                    className={classes.input}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onKeyUp={(e) => e.keyCode === 13 && handleSubmit()}
                    onChange={handleChange}
                />
                <IconButton className={classes.iconButton} aria-label="search" onClick={handleSubmit}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Container>
    )
}
