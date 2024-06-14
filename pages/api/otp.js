import sha256 from 'sha256'
import speakeasy from 'speakeasy'
import { validation } from 'utils'
import { PublishEncrypt, Check, Update } from './function/login'
import sameOriginPolicy from './middleware/same-origin-policy'

export default async(req, res) => {
	if (sameOriginPolicy(req) === false) throw new Error('req.origin wrong')
	
	if (req.method !== 'POST')  throw new Error('req.method wrong')

	const { kind, email, password, token } = req.body 

	if (!validation.email(email)) {
    	res.json({ code: 1, type: 'email' })
    	return
  	} 

	if (kind === 'listovey' && !validation.password(password)) {
    	res.json({ code: 1, type: 'password' })
      	return 
  	}

	if (!token) {
    	res.json({ code: 1, type: 'token' })
      	return 
  	}
	
	try {
		const check = new Check({ email })

		const { user_otp } = await check.getUserInfo()

		if (!user_otp) {
			res.json({ code: 1, type: 'token' })
			return 
		}

		const { secret } = user_otp
		if (!secret) {
			res.json({ code: 1, type: 'secret' })
			return 
		}

		// otp 번호 검증
		const verified = speakeasy.totp.verify({
			secret,
			encoding: 'base32',
			token
		})

		// 인증번호 틀릴때
		if (!verified) {
			res.json({ code: 1, type: 'bad-token' })
			return 
		}
		
		// 임시비밀번호 발급
		const publishEncrypt = new PublishEncrypt()

		console.log('ddd', kind, email, password)

		const encrypt = kind === 'listovey' ? await publishEncrypt.listovey({ email, password: sha256(password) }) : await publishEncrypt.google({ email })

		res.json({ code: 0, encrypt })

	} catch (e) {
		throw e
	}
}