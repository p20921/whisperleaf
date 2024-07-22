import { useRouter } from 'next/router'
import oc from 'open-color'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import ChildCareIcon from '@material-ui/icons/ChildCare'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import DoneIcon from '@material-ui/icons/Done'
import withBreakPoints from 'hoc/BreakPoints'

const useStyles = makeStyles(theme => ({
    buttonBox: {
        display: 'flex',
        gap: 5,
        justifyContent: 'center'
    },
    money: (props) => {
        const { category } = props

        return {
            background: theme.palette.money[(category === 'Money' || !category) ? 'dark' : 'main'],
            border: `1px dotted ${theme.palette.money.light}`,
            color: oc.gray[0],
            '&:hover': {
                background: theme.palette.money.dark,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: 11
            }
        }
    },
    lifestyle: (props) => {
        const { category } = props

        return {
            background: theme.palette.lifestyle[category === 'Lifestyle' ? 'dark' : 'main'],
            border: `1px dotted ${theme.palette.lifestyle.light}`,
            color: oc.gray[0],
            '&:hover': {
                background: theme.palette.lifestyle.dark,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: 11
            }
        }
    },
    health: (props) => {
        const { category } = props

        return {
            background: theme.palette.health[category === 'Health' ? 'dark' : 'main'],
            border: `1px dotted ${theme.palette.health.light}`,
            color: oc.gray[0],
            '&:hover': {
                background: theme.palette.health.dark,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: 11
            }
        }
    },
    food: (props) => {
        const { category } = props

        return {
            background: theme.palette.food[category === 'Food' ? 'dark' : 'main'],
            border: `1px dotted ${theme.palette.food.light}`,
            color: oc.gray[0],
            '&:hover': {
                background: theme.palette.food.dark,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: 11
            }
        }
    },
    parenting: (props) => {
        const { category } = props

        return {
            background: theme.palette.parenting[category === 'Parenting' ? 'dark' : 'main'],
            border: `1px dotted ${theme.palette.parenting.light}`,
            color: oc.gray[0],
            '&:hover': {
                background: theme.palette.parenting.dark,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: 11
            }
        }
    },
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

    const classes = useStyles({ category })

    const handleChange = (val) => {
        push(`/?category=${val}&startpoint=0&search=${search || ''}`)
    }

    return (
        <>
        <Container style={{ marginTop: xs ? 40 : 70 }}>
            <Box className={classes.buttonBox}>
                <Button 
                    disableElevation={(!category || category === 'Money')}
                    startIcon={xs ? null : <MonetizationOnIcon />}
                    className={classes.money} 
                    size={xs ? 'small' : 'medium'} 
                    variant="contained" 
                    onClick={() => handleChange('Money')}
                >
                    Money
                </Button>
                <Button 
                    disableElevation={category === 'Lifestyle'}
                    startIcon={xs ? null : <InsertEmoticonIcon />}
                    className={classes.lifestyle} 
                    size={xs ? 'small' : 'medium'} 
                    variant="contained" 
                    onClick={() => handleChange('Lifestyle')}
                >
                    Lifestyle
                </Button>
                <Button 
                    disableElevation={category === 'Health'}
                    startIcon={xs ? null : <DirectionsRunIcon />}
                    className={classes.health} 
                    size={xs ? 'small' : 'medium'} 
                    variant="contained"
                    onClick={() => handleChange('Health')}
                >
                    Wellness
                </Button>
                <Button 
                    disableElevation={category === 'Food'}
                    startIcon={xs ? null : <FastfoodIcon />}
                    className={classes.food} 
                    size={xs ? 'small' : 'medium'} 
                    variant="contained" 
                    onClick={() => handleChange('Food')}
                >
                    Food
                </Button>
               
             
                <Button 
                   disableElevation={category === 'Parenting'}
                    startIcon={xs ? null : <ChildCareIcon />}
                    className={classes.parenting} 
                    size={xs ? 'small' : 'medium'} 
                    variant="contained" 
                    onClick={() => handleChange('Parenting')}
                >
                    Parenting
                </Button>
            </Box>
        </Container>
        </>
    )
}

export default withBreakPoints(Main1)