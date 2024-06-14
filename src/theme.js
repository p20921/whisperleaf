import { createMuiTheme } from '@material-ui/core/styles'

// listovey4
// material-ui typography
let theme = createMuiTheme({
	typography: {
		fontFamily: ['"GmarketSans"', '"Roboto"', '"NotoKrM"'].join(','),
		button: {
			textTransform: 'none'
		}
	}
})

export default theme