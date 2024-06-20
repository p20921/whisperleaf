import Logo from 'component/Main/Logo'
import Tab from 'component/Main/Tab'
import Search from 'component/Main/Search'
import List from 'component/Main/List'

export const getParams = (props) => {
    const { category, startpoint, search } = props

    return {
        category: category || 'middle_east',
        startpoint: startpoint || 0,
        search: search || ''
    }
}

function Home(props) {
    const { rows, count, category  } = props

    return (
        <>
            <header>
               
            </header>
            <main>
                <Logo />
                <Tab category={category} />
                <Search />
                <List rows={rows} count={count} />
            </main>
            <footer>
       
            </footer>
        </>
    )
}


export const getServerSideProps = async (context) => {
    const { query } = context
    const { startpoint, category, search } = query

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