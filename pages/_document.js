import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { ServerStyleSheet, createGlobalStyle } from 'styled-components' 

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