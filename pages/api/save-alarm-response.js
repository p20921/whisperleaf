"use strict"

import db, { dbSlave} from 'model'
import sameOriginPolicy from './middleware/same-origin-policy'

const surveyMboxOption = db['survey_mbox_option']
const surveyMboxSlave = dbSlave['survey_mbox']

export default async(req, res) => {
    if (sameOriginPolicy(req) === false) throw new Error('req.origin wrong')

	if (req.method !== 'POST')  throw new Error('req.method wrong')

    const { survey_no, user_no, alarm } = req.body 

	try {
        const resMbox = await surveyMboxSlave.findOne({
            where: {
                survey_no,
                user_no
            }
        })

        if (!resMbox) {
            throw new Error('nothing Survey')
        }

        await surveyMboxOption.update({ alarm }, {
            where: {
                survey_no
            }
        })

		res.json(true)

	} catch(e) {
	
		throw e
	}
}