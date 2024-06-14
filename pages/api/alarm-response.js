"use strict"

import { dbSlave } from 'model'

const surveyMboxSlave = dbSlave['survey_mbox']
const surveyMboxOptionSlave = dbSlave['survey_mbox_option']
const userInfoSlave = dbSlave['user_info']

export default async(req, res) => {
	if (req.method !== 'GET')  throw new Error('req.method wrong')

    const { key } = req.query

	try {
        const [ _, email, survey_no ] = key.split('bkdfcxaysbjdfr')
        
        const resUserInfo = await userInfoSlave.findOne({
            where: {
                email
            }
        })

        if (!resUserInfo) {
            throw new Error('nothing User')
        }

        const { user_no } = resUserInfo

        const resMbox = await surveyMboxSlave.findOne({
            where: {
                survey_no,
                user_no
            }
        })

        if (!resMbox) {
            throw new Error('nothing Survey')
        }

        const { title } = resMbox

        const resMboxOption = await surveyMboxOptionSlave.findOne({
            where: {
                survey_no
            }
        })

        if (!resMboxOption) {
            throw new Error('nothing SurveyOption')
        }

        const { alarm } = resMboxOption

		res.json({ code: 0, title, survey_no, user_no, alarm })

	} catch(e) {
	
		throw e
	}
}