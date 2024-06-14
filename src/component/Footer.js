import { useCallback, useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import moment from 'moment-timezone'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import oc from 'open-color'
import htmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'
import JoinComponent from 'component/Auth/Join'
import LoginComponent from 'component/Auth/Login'
import OtpComponent from 'component/Auth/Otp'
import FindPasswordComponent from 'component/Auth/FindPassword'
import AgreeComponent from 'component/Auth/Agree'
import AlertSnackbar from 'ccomponent/AlertSnackbar'
import BackDrop from 'ccomponent/BackDrop'
import ErrorPage from 'ccomponent/ErrorPage'
import { setLangCookie, isCanService } from 'utils'

const useStyles = makeStyles({
    box: {
        backgroundColor: oc.gray[8],
        paddingTop: 50,
        paddingBottom: 30,
        paddingLeft: 3
    },
    boxCopyright: {
        backgroundColor: oc.gray[8],
        paddingTop: 30,
        paddingBottom: 50,
        borderTop: `1px solid ${oc.gray[7]}`
    },
    select: {
        background: 'white', 
        padding: 0, 
        height: 40,
        width: 140
    },
    licenseBox: {
        marginTop: 36
    },
    license: {
        color: 'white'
    },
    icon: {
        cursor: 'pointer',
        maxHeight: 20,
        marginRight: 10
    },
    a: {
        cursor: 'pointer',
        color: 'white',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    bottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 20,
        gap: 20,
        '& > div': {
            display: 'flex',
            alignItems: 'center',
            color: 'white'
        }
    }
})

const MyBoxUl = withStyles(theme => ({
    root: () => {
        return {
            width: '100%',
            maxWidth: theme.breakpoints.values.sm
        }
    }
}))(Box)

const MyGridUl = withStyles({
    root: {
        color: 'white'
    }
})(Grid)

const MyTypographyUl = withStyles(theme => ({
    root: {
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
            fontWeight: 600
        }
    }
}))(props => <Typography gutterBottom component="span" variant="h6" {...props}/>)

const MyTypographyLl = withStyles(theme => ({
    root: {
        marginTop: 10,
        cursor: 'pointer',
        transition: 'all .3s',
        '&:hover': {
            color: theme.palette.primary.light
        }
    }
}))(props => <Typography variant="body1" {...props}/>)

const MyBoxCopyright = withStyles(theme => ({
    root: {
        display: 'flex', 
        alignItems: 'center', 
        gap: 10, 
        flexWrap: 'wrap'
    }
}))(Box)

function Footer() {

    const classes = useStyles() 

    const { t, i18n  } = useTranslation('common')

    const [ lang, setLang ] = useState(i18n.language)

    const handleRouterPush = useCallback((src) => {
        Router.push(src)
    }, [])

    const handleYoutubePage = useCallback(() => {
        window.open('https://www.youtube.com/channel/UCZXnASXUIFSo1r9rtgktHsw', '_blank')
    }, [])

    const handleInstargramPage = useCallback(() => {
        window.open('https://instagram.com/listovey', '_blank')
    }, [])

    const handleBlogPage = useCallback(() => {
        window.open('https://blog.naver.com/listovey', '_blank')
    }, [])

    const handlePolicy = useCallback(() => {
        window.open('/policy/privacy', '_blank')
    }, [])

    const handleTerms = useCallback(() => {
        window.open('/policy/terms', '_blank')
    }, [])

    const changeLang = useCallback(val => {
        setLang(val)
        setLangCookie(val)
    }, [])

    useEffect(() => {
        const asPath = Router.router.asPath
        Router.push(asPath, asPath, { locale: lang })
    }, [lang])


    const timearea = moment.tz.guess()

    return (
        <>
        <Box className={classes.box}>
            <Container>
                <MyBoxUl>
                    <Grid container spacing={3}>
                        <MyGridUl item xs={4} sm={4} md={4}>
                            <MyTypographyUl>{t('component.HeaderBar.category.function.title')}</MyTypographyUl>
                            <MyTypographyLl onClick={() => handleRouterPush('/function/edit')}>{t('component.Function.Header.button.edit')}</MyTypographyLl>
                            <MyTypographyLl onClick={() => handleRouterPush('/function/share')}>{t('component.Function.Header.button.share')}</MyTypographyLl>
                            <MyTypographyLl onClick={() => handleRouterPush('/function/analysis')}>{t('component.Function.Header.button.analysis')}</MyTypographyLl>
                        </MyGridUl>
                        <MyGridUl item xs={4} sm={4} md={4}>
                            <MyTypographyUl>{t('component.HeaderBar.category.payment.title')}</MyTypographyUl>
                            <MyTypographyLl onClick={() => handleRouterPush('/price')}>{t('component.HeaderBar.category.payment.title')}</MyTypographyLl>
                        </MyGridUl>
                        <MyGridUl item xs={4} sm={4} md={4}>
                            <MyTypographyUl>{t('component.HeaderBar.category.support.title')}</MyTypographyUl>
                            <MyTypographyLl onClick={() => handleRouterPush('/support/help')}>{t('component.HeaderBar.category.support.title')}</MyTypographyLl>
                        </MyGridUl>
                    </Grid>
                </MyBoxUl>
                <Box className={classes.licenseBox}>
                <Typography variant="caption" className={classes.license}>
                    Icon made by Freepik from www.flaticon.com
                </Typography>
                </Box>
            </Container>
        </Box>
        <Box className={classes.boxCopyright}>
            <Container>
                <MyBoxCopyright>
                    <div>
                        <FormControl variant="outlined">
                            <Select
                                value={lang}
                                onChange={(e) => changeLang(e.target.value)}
                                className={classes.select}
                            >
                                <MenuItem value="ko">{`Korean`}</MenuItem>
                                <MenuItem value="jp">{`Japanese`}</MenuItem>
                                {
                                    (isCanService()) ? (
                                        <MenuItem value="en">{`English`}</MenuItem>
                                    ) : ''
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <Typography variant="body2" style={{fontSize: 12, color: 'white'}}>
                        {htmlParser(t('component.Footer.info'))}
                    </Typography>
                </MyBoxCopyright>
                          
                <Box className={classes.bottom}>
                    <div>
                        <Typography variant="caption" onClick={handlePolicy} className={classes.a}>{t('component.Footer.policy')}</Typography>
                        <Typography variant="caption" onClick={handleTerms}  className={classes.a} style={{marginLeft: 15}}>{t('component.Footer.terms')}</Typography>
                    </div>
                    <div>
                        <img 
                            src={`${process.env.NEXT_PUBLIC_IMG_AWS}/www/2023/icon-blog.png`} 
                            alt="blog"
                            className={classes.icon}
                            onClick={handleBlogPage}
                        />
                         <img 
                            src={`${process.env.NEXT_PUBLIC_IMG_AWS}/www/2023/icon-instargram.png`} 
                            alt="instargram"
                            className={classes.icon}
                            onClick={handleInstargramPage}
                        />
                    
                          <img 
                            src={`${process.env.NEXT_PUBLIC_IMG_AWS}/www/2023/icon-youtube.png`} 
                            alt="youtube"
                            className={classes.icon}
                            onClick={handleYoutubePage}
                        />
                   
                 
                        <Link href="mailto:support@listovey.com">
                            <a>
                                <Typography variant="body2" component="div" className="mail">support@listovey.com</Typography>
                            </a>
                        </Link>
                    </div>
                           
                </Box>
            </Container>
        </Box>
        {/* 회원가입 폼*/}
        <JoinComponent/>
        {/* 로그인 폼*/}
        <LoginComponent/>
         {/* Otp 폼*/}
         <OtpComponent/>
        {/* 비밀번호 찾기 폼*/}
        <FindPasswordComponent/>
        {/* 약관 폼*/}
        <AgreeComponent/>
        {/* alertSnackbar */}
        <AlertSnackbar/>
        {/* backdrop */}
        <BackDrop/>
        {/* errorPage */}
        <ErrorPage/>
        <Dialog open={false} >
            <DialogContent style={{background: oc.indigo[9], color: 'white', padding: 20, lineHeight: '155%'}}>
            안녕하세요, 리스토베이입니다.<br /><br />


            안정적인 서비스를 제공하기 위하여 <br/><b style={{color: oc.yellow[4]}}>2023년 5월 28일(일) 01:00 ~ 03:00 까지</b>  서버 점검 작업이 진행될 예정입니다.<br />

            작업 시간 동안 모든 서비스가 일시적으로 중단되오니 양해 부탁 드립니다.<br />

            이용에 불편을 드려 죄송하며, 보다 개선된 서비스를 위해 최선을 다하겠습니다.<br />

            궁금하신 사항은 <a href="mailto:support@listovey.com" style={{color: 'white'}}>support@listovey.com</a>으로 언제든 문의주세요.<br /><br />

            감사합니다.<br /><br />


            리스토베이 드림
            </DialogContent>
        </Dialog>
        </>
    )
}


export default Footer