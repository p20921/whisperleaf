import { useRouter } from 'next/router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
    },
  }),
);

export default function PaginationButtons(props) {
    const { count } = props
    const classes = useStyles()
    const router = useRouter()
    const { query, push } = router
    const { category, startpoint, search } = query

    const handleChange = (type, page) => {
        if (page-1 === Number(startpoint)) return
        push(`/?category=${category || ''}&startpoint=${page-1}&search=${search || ''}`)
    }

    return (
        <div className={classes.root}>
        <Pagination onChange={handleChange} count={Math.ceil(count / 10)} page={startpoint ? Number(startpoint) + 1 : 1} showFirstButton showLastButton color="primary" />
        </div>
    );
}
