"use strict"

import isChangePassword from './middleware/is-change-password'

export default async(req, res) => {
	try {
		const result = await isChangePassword(req, res)
        res.json(result)
	} catch(e) {
		throw e
	}
}