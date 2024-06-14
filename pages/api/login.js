import sha256 from 'sha256'
import { validation } from 'utils'
import { PublishEncrypt, Check, Update } from './function/login'
import sameOriginPolicy from './middleware/same-origin-policy'

// otp 설정 여부
export function isOtp(user_otp) {
	if (!user_otp) return false

	const { dataValues } = user_otp

	const { approve, used } = dataValues

	return (approve === 1 && used === 1) ? true : false
}

export default async(req, res) => {
	if (sameOriginPolicy(req) === false) throw new Error('req.origin wrong')
	
	if (req.method !== 'POST')  throw new Error('req.method wrong')

	const { email, password } = req.body 

	if (!validation.email(email)) {
    	res.json({ code: 1, type: 'email' })
    	return
  	} 

	if (!validation.password(password)) {
    	res.json({ code: 1, type: 'password' })
      	return 
  	}
	
	
	try {
		const check = new Check({ email })

		const { count: isEmail, user_no, count_status_40, status, auth, user_otp } = await check.getUserInfo()
		
		const update = new Update({ user_no })
		
		if (isEmail === 0) {	
			res.json({ code: 1, type: 'wrong-email' })
			return 
		}	  
		
		if (status !== 10) {
			res.json({ code: 1, type: `wrong-status-${status}` })
			return 
		}

		// 이메일 비밀번호 체크
		const { count: isAccount } = await check.isAccount(password)

		// 비밀번호가 틀릴경우
		if (!isAccount) {	

			// 비밀번호 틀린횟수 업데이트
			const countStatus40 = await update.countStatus40Failed(count_status_40)

			if (countStatus40 < 5) res.json({ code: 1, type: 'wrong-password', countStatus40 })
			else res.json({ code: 1, type: 'wrong-status-40' }) 
				
			return
		}

		if (!auth) {
			res.json({ code: 1, type: 'wrong-auth' })
			return 
		}

		// 검증 성공시, 실패카운트는 0으로 바꿘다
		await update.countStatus40Success()
		
		// OTP 인증이 있다면
		if (isOtp(user_otp)) {
			res.json({ code: 0, otp: true })
			return
		}


		// 임시비밀번호 발급
		const publishEncrypt = new PublishEncrypt()

		const encrypt = await publishEncrypt.listovey({ email, password: sha256(password) })

		res.json({ code: 0, encrypt })

	} catch (e) {
		throw e
	}
}