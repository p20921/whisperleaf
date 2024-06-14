import nodemailer from 'nodemailer'
import { encodeBuffer, getLang, replaceMailContext } from '../utils'
import { messages } from '../utils/message'
import * as Config from 'config/mail.json'

const config = Config.default

const message = messages.emailAuth

// type: join(회원가입), retry-email-auth(재가입)
export default async function sendEmailAuth(props) {
    const { req, email } = props

	const lang = getLang(req)

    let transporter = nodemailer.createTransport({
    	host: config.host,
    	port: config.port,
    	secure: config.secure,
    	auth: {
      		user: config.user,
      		pass: config.pass
    	}
  	})
	
	const token = encodeBuffer(email)
	const router = `/email-auth?token=${token}`
	
	let html = replaceMailContext({ req, fileSrc: '/pages/api/mail/html/email-auth.html' })
	html = html.replace(/%CODE%/g, router)
	html = html.replace(/%TITLE%/, message[lang].title)
	html = html.replace(/%CONTENT%/, message[lang].content)
	html = html.replace(/%BUTTON%/, message[lang].button)

	try {
		const result = await transporter.sendMail({
			from: config.from,
			to: email,
			subject: message[lang].subject,
			html
		})

		return result
	} catch(e) {
		throw e
	}
}