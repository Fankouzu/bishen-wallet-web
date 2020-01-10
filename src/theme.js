import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            light: '#ff4081',
            main: '#f50057',
            dark: "#c51162",
            contrastText: '#ffffff',
        },
        default: {
            light: '#ffd54f',
            main: '#ffc107',
            dark: "#ffa000",
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: "#388e3c",
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },
        Warning:{
            light: '#ffb74d',
            main: '#ff9800',
            dark: "#f57c00",
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: "#d32f2f",
            contrastText: '#fff',
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 12,
    }
})

export default theme
