import { Categorys } from 'utils/constants'
import { getCapitalize } from 'utils'
import Logo from 'component/Main/Logo'
import Tab from 'component/Main/Tab'
import Search from 'component/Main/Search'
import List from 'component/Main/List'
import Header from 'component/Header'

export const getParams = (props) => {
    const { category, startpoint, search } = props

    return {
        category: category || 'Money',
        startpoint: startpoint || 0,
        search: search || ''
    }
}

function Home(props) {
    const { rows, count, category  } = props

    const title = "Whisperleaf"
    const description = "Whisperleaf: Your ultimate guide to money management, lifestyle enhancements, effective parenting, delicious food recipes, and health tips. Explore expert advice, practical tips, and resources to enrich your life."
    const keywords = "Whisperleaf, money management, personal finance, budgeting, saving, investing, lifestyle tips, parenting advice, child care, recipes, cooking tips, healthy eating, health tips, wellness, fitness, mental health, balanced living"

    const thumbnail = `${process.env.ORIGIN}/logo.png`

    return (
        <>
            <header>
                <Header title={title} description={description} keywords={keywords} thumbnail={thumbnail} />  
            </header>
            <main>
                <Logo />
                <Tab category={category} />
                <Search category={category} />
                <List category={category} rows={rows} count={count} />
            </main>
            <footer>
    
            </footer>
        </>
    )
}


export const getServerSideProps = async (context) => {
    const { query } = context
    const { startpoint, category, search } = query

    if (category) {
        if (!Categorys.includes(getCapitalize(category))) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
    }

    const params = getParams({ startpoint, category, search })

    try {
        const result = await fetch(`${process.env.API_ORIGIN}/api/item_list?category=${params.category}&startpoint=${params.startpoint}&search=${params.search}`)

        const { rows, count } = await result.json()

        return {
            props: { rows, count, category: params.category }
        }

    } catch(e) {
        res.setHeader('Location', '/')
        res.statusCode = 302
        res.end()
    }
}



export default Home