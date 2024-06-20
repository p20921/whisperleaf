import { memo } from 'react'
import { useRouter } from 'next/router'
import oc from 'open-color'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 10,
        transition: 'all .3s',
        borderBottom: `1px solid ${oc.gray[3]}`,
        cursor: 'pointer',
        '&:hover': {
            background: oc.gray[4]
        }
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        color: 'black',
        wordBreak: 'break-all',
        '& > div:first-child': {
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        '& > div:last-child': {
            width: 140,
            textAlign: 'center',
            fontSize: 12,
            color: oc.gray[6]
        },
    },
    category: {
        borderRadius: 5,
        background: oc.gray[5],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        padding: 5
    }
}))

function ItemComponent(props) {
    const { no, subject, pathname, wdate } = props 
    
    const classes = useStyles()

    const { query, push } = useRouter()

    const { category, startpoint, search } = query

    const handleClick = () => {
        push(`/content/${pathname}?category=${category || ''}&startpoint=${startpoint || 0}&search=${search || ''}`)
    }

    return (
        <Box className={classes.paper} onClick={handleClick}>
            <Box className={classes.box}>
                <div>{subject}</div>
                <div>{moment(wdate).calendar()}</div>
            </Box>
        </Box>
    )
}

export default memo(ItemComponent)