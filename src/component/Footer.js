import Link from 'next/link'
import oc from 'open-color'
import HtmlParser from 'react-html-parser'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import withBreakPoints from 'hoc/BreakPoints'

function Footer(props) {
    const { breakpoints } = props
    const { xs } = breakpoints

    return (
        <>
        <Divider light />
        <Container style={{ marginTop: 20, marginBottom: 30 }}>
            {
                xs ? (
                    <Typography variant="body2" color="textSecondary" style={{ lineHeight: '165%' }}>
                    {
                        HtmlParser(`<span style="text-shadow: 1px 1px 3px #A8A684; color: #8A8667;">Whisperleaf</span><br /><a href="mailto:makejday@gmail.com" style="text-decoration: underline; color: ${oc.gray[5]};">makejday@gmail.com</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="${process.env.NEXT_PUBLIC_ORIGIN}/cookie_policy" target="_blank"  style="text-decoration: underline; color: ${oc.gray[5]};">Cookie Policy</a>`)
                    }
                    </Typography>
                ) : (
                    <Typography variant="body2" color="textSecondary"  style={{ lineHeight: '165%' }}>
                        {
                            HtmlParser(`<span style="text-shadow: 1px 1px 3px #A8A684; color: #8A8667;">Whisperleaf</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="mailto:makejday@gmail.com"  style="text-decoration: underline; color: ${oc.gray[6]};">makejday@gmail.com</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="${process.env.NEXT_PUBLIC_ORIGIN}/cookie_policy" target="_blank"  style="text-decoration: underline; color: ${oc.gray[6]};">Cookie Policy</a>`)
                        }
                    </Typography>
                )
            }
        </Container>
        </>
    )
}


export default withBreakPoints(Footer)