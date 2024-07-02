import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import App from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider as MThemeProvider } from '@material-ui/core/styles'
import wrapper from 'reducer/configureStore'
import theme from '../src/theme'
import '../styles/globals.css'
import '../styles/Animate.css'


class _App extends App { 
    componentDidMount() { 
        // 서버사이드에서 삽입한 CSS를 제거 
        const jssStyles = document.querySelector('#jss-server-side')
        
        if (jssStyles) { 
            jssStyles.parentNode.removeChild(jssStyles)
        }
    } 
    
    render() { 
        const { Component, pageProps, countryCode } = this.props
    
        return ( 
            <>
                <Head>
                    <title>Whisperleaf</title>
                </Head>
                <MThemeProvider theme={theme}>
                    <Component countryCode={countryCode} {...pageProps} />
                </MThemeProvider>
               
            </> 
        ) 
    } 
    
}

export default wrapper.withRedux(appWithTranslation(_App))