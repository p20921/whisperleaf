import Link from 'next/link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Page404Svg from 'svg/404.svg'
import { useTranslation } from 'next-i18next'
import BlankPage, { HomeButton } from 'styled/BlankPage'

const useStyles = makeStyles(theme => ({
    svg: {
        maxWidth: 300,
        maxHeight: 300,
        minWidth: 150,
        minHeight: 150,
        marginBottom: 50
    }
}))

function Page404() {
    const classes = useStyles()

    const { t } = useTranslation('common')

    return (
        <BlankPage>
            <Page404Svg className={classes.svg}/>
            <Link href='/'><a>
                <HomeButton variant="contained" size="large" color="primary">{t('component.Page404.home')}</HomeButton>
            </a></Link>
        </BlankPage>
    )
}

export default Page404 