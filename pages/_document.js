import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { ServerStyleSheet, createGlobalStyle } from 'styled-components' 
import { GA_TRACKING_ID } from 'lib/gtag'

const GlobalStyles = createGlobalStyle`
    html, body {
        background-color: white;
    }
`

class _Document extends Document { 
	static async getInitialProps (ctx) { 
		const styledComponentsSheet = new ServerStyleSheet() 
		const materialSheets = new ServerStyleSheets() 
		const originalRenderPage = ctx.renderPage

		try { 
			ctx.renderPage = () => (
				originalRenderPage({ 
					enhanceApp: App => props => (
						styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props}/>))
					)
				})
			)

			const initialProps = await Document.getInitialProps(ctx)

			return { 
				...initialProps, 
				styles: ( 
					<React.Fragment> 
						{initialProps.styles} 
						{materialSheets.getStyleElement()} 
						{styledComponentsSheet.getStyleElement()} 
					</React.Fragment> 
				) 
			} 
		} catch(e) {
			throw e
		} finally { 
			styledComponentsSheet.seal() 
		}
	} 
		
	render() { 
		return ( 
			<>
			<GlobalStyles/>
			<Html lang={this.props.locale || 'ko'} dir="ltr">

				<Head>
					<link href="https://webfontworld.github.io/gmarket/GmarketSans.css" rel="stylesheet"/>
					<meta charSet="utf-8"/>	
					<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_TRACKING_ID}', {
						page_path: window.location.pathname,
						});
					`,
					}}
				/>			
				</Head> 
				<body> 
					<Main /> 
					<NextScript /> 
				</body> 
			</Html> 
			</>
		) 
	} 
} 

export default _Document