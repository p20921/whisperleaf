import db, { dbSlave } from 'model'

const commentSlave = dbSlave['comment']

export default async(req, res) => {
	if (req.method !== 'GET')  throw new Error('req.method wrong')

    try {
        const { item_id } = req.query

        const rows = await commentSlave.findAll({
            where: { item_id },
            order: [[ 'wdate', 'desc' ]]
        })

        res.json({ rows })
    } catch (e) {
        res.json({ rows })
    }
    
}