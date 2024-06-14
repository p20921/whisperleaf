"use strict"

import isChangePassword from './middleware/is-change-password'
import sameOriginPolicy from './middleware/same-origin-policy'
import db from 'model'
import { validation } from 'utils'
import sha256 from 'sha256'

const userInfo = db['user_info']
const userAuth = db['user_auth']

export default async(req, res) => {
	if (sameOriginPolicy(req) === false) throw new Error('req.origin wrong')
	
	if (req.method !== 'POST')  throw new Error('req.method wrong')

	const { password, retryPassword } = req.body 

	if (!validation.password(password) || !validation.password(retryPassword)) {
    	throw new Error('password')
  	}

	if (password !== retryPassword) {
    	throw new Error('different')
  	}

	try {
		const resultAuth = await isChangePassword(req, res)
		const { code, result: info } = resultAuth

		if (code === 1) {
			throw new Error('different')
		}

		const { user_no } = info

		const result = await userInfo.findOne({
			where: { user_no }
		})

		// 비밀번호 초과로 인한 상태값이 40이면 정상인 10으로 변경해주고 20, 30일경우 비정상 계정이기때문에 비밀번호 변경해도 상태값은 유지된다.
		await userInfo.update({
			pwd: sha256(password),
			count_status_40: 0,
			status: result.status === 40 ? 10 : result.status
		}, {
			where: {
				user_no
			}
		})

		await userAuth.update({
			find_password_token: null,
			find_password_time: null
		}, {
			where: {
				user_no
			}
		})
		
		res.json({ code: 0 })

	} catch(e) {
	
		throw e
	}
}