import { createMuiTheme } from '@material-ui/core/styles'

// listovey4
// material-ui typography
let theme = createMuiTheme({
	typography: {
		fontFamily: ['"Roboto"', '"NotoKrM"'].join(','),
		button: {
			textTransform: 'none'
		}
	},
	palette: {
		money: {
			light: '#E0E0E0',
		  	main: '#9E9E9E',
			dark: '#616161'
		},
		lifestyle: {
			light: '#C8E6C9',
			main: '#81C784',
		  	dark: '#388E3C'
		},
		health: {
			light: '#E1F5FE',
			main: '#81D4FA',
		  	dark: '#0277BD'
		},
		food: {
			light: '#FAD4D4',
			main: '#F28B82',
		  	dark: '#D32F2F'
		},
		parenting: {
			light: '#FFF9C4',
			main: '#FFD54F',
		  	dark: '#FFB300'
		},
		primary: {
			light: '#CBC8A0',
			main: '#8A8667',
		  	dark: '#6C6954'
		}
	},
})

//recommend blog category "red" background Soft Pastels color 
//Please tell me the difference between light, main, dark colors in similar color series

export default theme



//recommend blog category Money background color 
//Please tell me the difference between light, main, dark colors in similar color series

//recommend blog category lifestyle background color

//Money lifestyle health food parenting



//recommend blog category "invest" background Soft Pastels color 
//Please tell me the difference between light, main, dark colors in similar color series