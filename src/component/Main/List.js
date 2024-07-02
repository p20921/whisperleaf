import { memo } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CardComponent from './Card/Component'
import PageComponent from './Page'

function ListComponent(props) {
    const { category, item_id, rows, count } = props

    const newRows = []

    for (let i=0; i<11; i++) {
        newRows.push(rows[0])
    }

    return (
        <Container style={{ marginTop: 50, paddingBottom: 50 }}>
            <Box style={{ display: 'flex', flexWrap: 'wrap',  gap: 20 }}>
            {
                rows.map((c) => <CardComponent key={c.item_id} category={category} selected={c.item_id === item_id} subject={c.subject} summary={c.summary} thumbnail={c.thumbnail} pathname={c.pathname} wdate={c.wdate} loveCount={c.loveCount} commentCount={c.commentCount} />)
            }
            </Box>
            <PageComponent count={count} />
        </Container>
    )
}

export default memo(ListComponent)