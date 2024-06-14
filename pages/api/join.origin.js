import { Create } from './function/join'
import { Check } from './function/login'
import { validation } from 'utils'
import sendJoin from './mail/join'
import sameOriginPolicy from './middleware/same-origin-policy'

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
		// email 중복검사
		const check = new Check({ email })

		const { count: isOverlap, status } = await check.getUserInfo()

		if (isOverlap > 0 && status !== 10) {
			res.json({ code: 1, type: `wrong-status-${status}` })
			return 
		}

		if (isOverlap > 0) {	
			res.json({ code: 1, type: 'overlap' })
			return 
		}
		
		const createJoin = new Create()
		await createJoin.listovey({ email, password })
		await sendJoin({ req, email })
  
		res.json({ code: 0 })
	} catch (e) {
		throw e
	}
}