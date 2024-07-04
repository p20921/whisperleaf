import Divider from '@material-ui/core/Divider'
import { getParams } from '../../index'
import Logo from 'component/Main/Logo'
import Tab from 'component/Main/Tab'
import Search from 'component/Main/Search'
import List from 'component/Main/List'
import Subject from 'component/Main/Subject'
import Body from 'component/Main/Body'
import Like from 'component/Main/Like'
import CommentInput from 'component/Main/CommentInput'
import CommentList from 'component/Main/CommentList'
import Header from 'component/Header'

function Content(props) {
    const { rows, count, category, row  } = props

    const { item_id, subject, content, thumbnail, description, keywords, love, wdate } = row

    const title = `Whisperleaf | ${subject}`

    return (
        <>
            <header>
                <Header title={title} description={description} keywords={keywords} thumbnail={thumbnail} />  
            </header>
            <main>
                <div id="main">                
                    <Logo />
                    <Tab category={category} />
                    <Search category={category} />
                    <Subject subject={subject} wdate={wdate} rand={Math.random()} />
                    <Body content={content} thumbnail={thumbnail} subject={subject} />
                    <Like item_id={item_id} like={love} />
                    <CommentInput item_id={item_id} />
                    <CommentList item_id={item_id} />
                    <div style={{ height: 60 }}></div>
                    <Divider />
                    <List category={category} rows={rows} count={count} item_id={item_id} />
                </div>
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


        if (!row) {
            // Redirect to the login page
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    
        return {
            props: { rows, count, category: params.category, row }
        }

    } catch(e) {
  
        res.setHeader('Location', '/')
   
        res.end()
    }
}


export default Content