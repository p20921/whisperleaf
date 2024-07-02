import { useRouter } from 'next/router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import HeaderComponent from './Header'
import ThumbnailComponent from './Thumbnail'
import SummaryComponent from './Summary'
import ActionComponent from './Action'

const useStyles = makeStyles(theme =>
    createStyles({
        root: (props) => {
            const { selected } = props

            return {
                width: 'calc(100%  / 3.101)',
                [theme.breakpoints.down('sm')]: {
                    width: 'calc(100%  / 2.06)',
                },
                [theme.breakpoints.down('xs')]: {
                    width: '100%',
                },
                cursor: 'pointer',
                background: selected ? theme.palette.primary.light : 'transparent'
            }
        }
    })
)

export default function CardComponent(props) {
    const { category, selected, subject, summary, thumbnail, pathname, wdate, loveCount, commentCount } = props

    const classes = useStyles({ selected })
    
    const { query, push } = useRouter()

    const { startpoint, search } = query

    const handleClick = () => {
        push(`/content/${category}/${pathname}?startpoint=${startpoint || 0}&search=${search || ''}`)
    }

    return (
        <Card className={classes.root} onClick={handleClick}>
            <HeaderComponent subject={subject} wdate={wdate} />
            <ThumbnailComponent subject={subject} thumbnail={thumbnail} />
            <SummaryComponent summary={summary} />
            <ActionComponent loveCount={loveCount} commentCount={commentCount} />
        </Card>
    );
}
