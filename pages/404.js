import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


function Page404() {
    const getHeadTag = useHeadTag()

    return null
}

export const getStaticProps = async ({ locale }) => {
    return {
         props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    }
}

export default Page404