"use strict"

import db, { sequelize } from 'model'
import { validation } from 'utils'
import sendFindPassword from './mail/find-password'
import randomstring from 'randomstring'
import sameOriginPolicy from './middleware/same-origin-policy'

const userInfo = db['user_info']
const userAuth = db['user_auth']

export default async(req, res) => {
	if (sameOriginPolicy(req) === false) throw new Error('req.origin wrong')

	if (req.method !== 'POST')  throw new Error('req.method wrong')

	const { email } = req.body 

	if (!validation.email(email)) {
    	res.json({ code: 1, type: 'email' })
    	return
  	}


	
	try {
		// is 이메일 여부
		const result = await userInfo.findOne({ 
			where: { email }
		})

		if (!result) {	
			res.json({ code: 1, type: 'wrong-email' })
			return 
		} 

		const { user_no, status } = result

		if (status !== 10 && status !== 40) {
			res.json({ code: 1, type: 'wrong-status', status: result.status })
			return 
		} 

		const token = randomstring.generate(35)

		await sendFindPassword({ req, email, token })

		await userAuth.upsert({
			user_no,
			find_password_token: token,
			find_password_time: sequelize.fn('NOW')
		})

		res.json({ code: 0 })

	} catch(e) {
	
		throw e
	}
}