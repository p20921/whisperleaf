import db from 'model'
import { validation } from 'utils'
import { PublishEncrypt } from './function/login'
import { decodeBuffer, getAuthTime } from './utils'
import sendWelcome from './mail/welcome'

const userInfo = db['user_info']
const userAuth = db['user_auth']

export default async(req, res) => {
	const { token, join } = req.body 

	const email = decodeBuffer(token)

	if (!validation.email(email)) {
		res.status(302).send('email wrong')
		return
  	} 
	
	try {

		// email auth 중복검사
		const result = await userInfo.findOne({ 
			where: { email }
		})

		if (!result) {
			res.status(302).send('error')
			return
		}

		const { user_no, pwd, auth, lang } = result

		// 이미 인증된 메일이라면 error 처리해서 탑페이지로 넘긴다.
		if (auth) {	
			res.status(302).send('overlap')
			return
		}
		
		// 24시간이 지났다면, 인증처리 하지못한다 (사용자에게 안내문구)
		const resultAuth = await userAuth.findOne({ 
			where: { user_no }
		})

		if (!resultAuth || !resultAuth.join_time) {
			res.json({ code: 1, type: 'null' })
			return
		}

		const diff = getAuthTime(resultAuth.join_time)
    
		// 유효시간 체크
		if (diff > 24) {
			res.json({ code: 1, type: 'overtime' })
			return
		}
		
		// user_info auth update 데이터 저장, user_auth join_time null
		await Promise.all([
			userInfo.update({
				auth: true
			}, { where: { email } }),
			userAuth.update({
				join_time: null
			}, { where: { user_no} })
		])

		// 임시비밀번호 발급
		const publishEncrypt = new PublishEncrypt()

		const encrypt = await publishEncrypt.listovey({ email, password: pwd })

		// 환영메일 보내기
		await sendWelcome({ req, lang, email })
		

		res.json({ code: 0, type: null, encrypt })

	} catch (e) {
		throw e
	}
}