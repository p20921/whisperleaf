import fs from 'fs'
import moment from 'moment'
import { messages } from './message'

export const encodeBuffer = (val) => {
    return Buffer.from(val.toString()).toString('base64').replace(/=/g, '')
}

export const decodeBuffer = (val) => {
    return Buffer.from(val, 'base64').toString('ascii')
}

export const getLang = (req) => {
    const locale = req.cookies['NEXT_LOCALE'] || 'ko'

    return locale
}


// 메일 내용 기본 변경 함수
export const replaceMailContext = (props) => {
    const { req, fileSrc } = props

    const message = messages.authtime

    const lang = getLang(req)


    let html = fs.readFileSync(`${process.cwd()}${fileSrc}`, 'utf8')
	html = html.replace(/%ORIGIN%/g, process.env.WWW_ORIGIN)
    html = html.replace(/%LOGO%/g, `${process.env.IMG_ORIGIN}/server/email-face-logo.png`)
    html = html.replace(/%AUTHTIME%/, message[lang].authtime)

    return html
}

// authtime 기준 현 시간까지 몇시간 지났는지 계산
export const getAuthTime = (authtime) => {
    const now = moment()
    const passwordTime = moment(authtime, 'YYYY-MM-DD HH:mm')

    const diff = moment.duration(now.diff(passwordTime)).asHours()

    return diff
}