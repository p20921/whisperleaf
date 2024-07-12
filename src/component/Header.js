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
            <link rel="canonical" href={process.env.NEXT_PUBLIC_ORIGIN}/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
            <meta name="keywords" content={keywords}/>
            <meta  name="description" content={description}/>
            <meta property="og:description" content={description}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:locale:alternate" content="en_US"/>
            <meta property="og:title" content={title}/>
            <meta property="og:image" content={thumbnail}/>
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_ORIGIN}${path}`}/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="google-adsense-account" content="ca-pub-2677225610510516" />
            <meta name="naver-site-verification" content="70131c24f28afa2d0d266df8a7ffdb5812d71e50" />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2677225610510516" crossorigin="anonymous"></script>
        </Head>
    )
}

export default memo(HeaderComponent)