import Divider from '@material-ui/core/Divider'
import { getParams } from '../index'
import Logo from 'component/Main/Logo'
import Tab from 'component/Main/Tab'
import Search from 'component/Main/Search'
import List from 'component/Main/List'
import Subject from 'component/Main/Subject'
import Body from 'component/Main/Body'
import Like from 'component/Main/Like'
import CommentInput from 'component/Main/CommentInput'
import CommentList from 'component/Main/CommentList'

function Content(props) {
    const { rows, count, category, row  } = props

    const { item_id, subject, content, love, wdate } = row

    return (
        <>
            <header>
               
            </header>
            <main>
                <Logo />
                <Tab category={category} />
                <Search  />
                <Subject subject={subject} wdate={wdate} />
                <Body content={content} />
                <Like item_id={item_id} like={love} />
                <CommentInput item_id={item_id} />
                <CommentList item_id={item_id} />
                <div style={{ height: 60 }}></div>
                <Divider />
                <List rows={rows} count={count} />
            </main>
            <footer>
       
            </footer>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { query } = context
    const { startpoint, category, search, key } = query

    const params = getParams({ startpoint, category, search })

    try {
        const items = await fetch(`${process.env.API_ORIGIN}/api/item_list?category=${params.category}&startpoint=${params.startpoint}&search=${params.search}`)

        const { rows, count } = await items.json()

        const body = await fetch(`${process.env.API_ORIGIN}/api/content?pathname=${key}&category=${params.category}`)

        const { row } = await body.json()

        return {
            props: { rows, count, category: params.category, row }
        }

    } catch(e) {
        res.setHeader('Location', '/')
        res.statusCode = 302
        res.end()
    }
}


export default Content