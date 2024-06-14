import db, { sequelize } from 'model'
import sendEmailAuth from './mail/email-auth'
import { validation } from 'utils'

const userAuth = db['user_auth']
const userInfo = db['user_info']

export default async(req, res) => {

	const { email } = req.body 

	if (!validation.email(email)) {
    	res.json({ code: 1, type: 'email' })
    	return
  	} 
	
	try {
		const result = await userInfo.findOne({ 
			where: { email }
		})

		if (!result) throw new Error('null')

		await userAuth.update({ join_time: sequelize.fn('NOW') }, { where: { user_no: result.user_no}})
		await sendEmailAuth({ req, email })
  
		res.json({ code: 0 })

	} catch(e) {
		throw e
	}
}