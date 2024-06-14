import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Section1 from 'component/Main/Section1'

function Home() {
    return (
        <>
            <header>
               
            </header>
            <main>
                <Section1/>
             
            </main>
            <footer>
       
            </footer>
        </>
    )
}


export const getStaticProps = async (props) => {
    const { locale } = props
    
    return {
         props: {
            ...(await serverSideTranslations(locale, ["common"])),
        }
    }
}


export default Home