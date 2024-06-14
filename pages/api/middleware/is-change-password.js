"use strict"

import db from 'model'
import { getAuthTime } from '../utils'

const userAuth = db['user_auth']

export default async(req, res) => {

    return new Promise(async(resolve, reject) => {
        const { token } = req.query
	
        try {
            // is 이메일 여부
            const result = await userAuth.findOne({ 
                where: { find_password_token: token }
            })
            
            if (!result) {	
                resolve({ code: 1, type: 'null' })
                return 
            } 
    
            const { find_password_time } = result
        
            const diff = getAuthTime(find_password_time)
    
            // 유효시간 체크
            if (diff > 24) return resolve({ code: 1, type: 'overtime' })
            else return resolve({ code: 0, type: null, result })
        } catch(e) {
        
            throw e
        }
    })
}