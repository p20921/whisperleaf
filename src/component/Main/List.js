import Container from '@material-ui/core/Container'
import ItemComponent from './Item'
import PageComponent from './Page'

function List(props) {
    const { rows, count } = props

    return (
        <Container style={{ marginTop: 50, paddingBottom: 50 }}>
            {
                rows.map(c => <ItemComponent key={c.item_id} subject={c.subject} pathname={c.pathname} wdate={c.wdate} />)
            }
            <PageComponent count={count} />
        </Container>
    )
}

export default List