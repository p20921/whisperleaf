import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Page404Component from 'component/Page404'
import useHeadTag from 'hooks/useHeadTag'

function Page404() {
    const getHeadTag = useHeadTag()

    return (
        <>
        <Head>
            {getHeadTag()}
        </Head>
        <Page404Component/>
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