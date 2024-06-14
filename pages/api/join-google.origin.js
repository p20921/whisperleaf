// 구글로 가입, 로그인 동일함
import { google } from "googleapis"
import { validation } from 'utils'
import * as googleConfig from 'config/google.json'
import { Create } from './function/join'
import { PublishEncrypt, Check } from './function/login'
import sameOriginPolicy from './middleware/same-origin-policy'
import { isOtp } from './login'

const env = process.env.NEXT_PUBLIC_ENV || "development"

const { clientID, clientSecret } = googleConfig.oAuth[env]

const Oauth2Client = new google.auth.OAuth2(
	clientID,
	clientSecret,
	'postmessage'
)

export default async(req, res) => {
	if (sameOriginPolicy(req) === false) throw new Error('req.origin wrong')
	
	if (req.method !== 'POST')  throw new Error('req.method wrong')

	const { t } = req.body 

	google.options({ auth: Oauth2Client })

	try {
		const { tokens } = await Oauth2Client.getToken(t)
		const { access_token } = tokens

		const oauth2Client = new google.auth.OAuth2()

		oauth2Client.setCredentials({ access_token })

		const oauth2 = google.oauth2({
			auth: oauth2Client,
			version: 'v2'
		})
		
		const { data } = await oauth2.userinfo.get()

		const { email, picture: img_src } = data

		if (!validation.email(email)) {
			res.json({ code: 1, type: 'email' })
			return
		} 
		
		const check = new Check({ email })

		const { count: is, status, user_otp } = await check.getUserInfo()

		// 계정이 있는상태에서 status가 정상(10) 또는 로그인 횟수초과(40)가 아니라면 (구글로그인으로 가입한사람이 일반로그인으로 착각학고 비번 존니눌러대는데 구글로그인르로 성공하면 다시 정상으로 바꿔준다.)
		if (is && (status !== 10 && status !== 40)) {
			res.json({ code: 1, type: `wrong-status-${status}` })
			return 
		}

		const createJoin = new Create()
		await createJoin.google({ email, img_src })


		// OTP 인증이 있다면 (회원가입때는 무조건 없다)
		if (isOtp(user_otp)) {
			res.json({ code: 0, otp: true, email })
			return
		}

		// 임시비밀번호 발급
		const publishEncrypt = new PublishEncrypt()

		const encrypt = await publishEncrypt.google({ email })

		res.json({ code: 0, encrypt, email })
	} catch (e) {
		throw e
	}
}