import { ComponentType } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

function BreakPoints(WrappedComponent) {
    return function BreakPointsComponent(props) {
        const theme = useTheme()

        const xs = useMediaQuery(theme.breakpoints.down('xs'))
        const sm = useMediaQuery(theme.breakpoints.down('sm'))
        const md = useMediaQuery(theme.breakpoints.down('md'))
        const lg = useMediaQuery(theme.breakpoints.down('lg'))
        const xl = useMediaQuery(theme.breakpoints.down('xl'))
    
        const breakpoints = {
            xs,
            sm,
            md,
            lg,
            xl
        }
    
        return <WrappedComponent breakpoints={breakpoints} {...props}/>
    }  
}

export default BreakPoints