import { memo } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'

function HeaderComponent(props) {
    const { thumbnail, title, keywords, description } = props

    const router = useRouter()

    const [ path ] = router.asPath.split('?')

    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href={`/favicon.ico`} />
            <link rel="canonical" href={process.env.NEXT_PUBLIC_WWW_ORIGIN}/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
            <meta name="keywords" content={keywords}/>
            <meta  name="description" content={description}/>
            <meta property="og:description" content={description}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:locale:alternate" content="en_US"/>
            <meta property="og:title" content={title}/>
            <meta property="og:image" content={thumbnail}/>
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_WWW_ORIGIN}${path}`}/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
        </Head>
    )
}

export default memo(HeaderComponent)