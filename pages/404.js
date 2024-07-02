import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Logo from 'component/Main/Logo'
import Page404Component from 'component/Page404'
import Header from 'component/Header'

function Page404() {
    const title = "Whisperleaf"
    const description = "Whisperleaf: Your ultimate guide to money management, lifestyle enhancements, effective parenting, delicious food recipes, and health tips. Explore expert advice, practical tips, and resources to enrich your life."
    const keywords = "Whisperleaf, money management, personal finance, budgeting, saving, investing, lifestyle tips, parenting advice, child care, recipes, cooking tips, healthy eating, health tips, wellness, fitness, mental health, balanced living"

    return (
        <>
            <header>
                <Header title={title} description={description} keywords={keywords} />  
            </header>
            <main>
                <Logo />
                <Page404Component />
            </main>
            <footer>
       
            </footer>
        </>
    )
}

export const getStaticProps = async ({ locale }) => {
    return {
         props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    }
}

export default Page404