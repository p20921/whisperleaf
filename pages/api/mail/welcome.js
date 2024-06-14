import nodemailer from 'nodemailer'
import { replaceMailContext } from '../utils'
import { messages } from '../utils/message'
import * as Config from 'config/mail.json'

const config = Config.default

const message = messages.welcome

// 가입 환영 메일
export default async function sendEmailWelcome(props) {
    const { req, lang, email } = props

    let transporter = nodemailer.createTransport({
    	host: config.host,
    	port: config.port,
    	secure: config.secure,
    	auth: {
      		user: config.user,
      		pass: config.pass
    	}
  	})
	
	let html = replaceMailContext({ req, fileSrc: '/pages/api/mail/html/welcome.html' })

	html = html.replace(/%TITLE%/, message[lang].title)
	html = html.replace(/%CONTENT%/, message[lang].content)
	html = html.replace(/%GUIDEBUTTON%/, message[lang].guideButton)
	html = html.replace(/%HOMEBUTTON%/, message[lang].homeButton)
	html = html.replace(/%NOREPLY%/, message[lang].noReply)
	
	try {
		const result = await transporter.sendMail({
			from: config.fromWelcom,
			to: email,
			subject: message[lang].subject,
			html
		})

		return result
	} catch(e) {
		throw e
	}
}