import  { dbSlave, sequelizeSlave } from 'model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const itemSlave = dbSlave['item']

export default async(req, res) => {
	if (req.method !== 'GET')  throw new Error('req.method wrong')

    const { pathname, category } = req.query

    let where = { kind: category, pathname }

	try {
        const resItem = await itemSlave.findOne({
            attributes: [ 'item_id', 'subject', 'content', 'love', 'description', 'keywords', 'thumbnail', 'wdate' ],
            where
        })

		res.json({ row: resItem })

	} catch(e) {
	
		throw e
	}
}