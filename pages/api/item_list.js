import  { dbSlave, sequelizeSlave } from 'model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const itemSlave = dbSlave['item']

export default async(req, res) => {
	if (req.method !== 'GET')  throw new Error('req.method wrong')

    const { category, startpoint, search } = req.query

    let where = { kind: category }

    if (search) {
        where = {
            ...where,
            [Op.or]: [
                { subject: { [Op.like]: "%" + search + "%" } },
                { content: { [Op.like]: "%" + search + "%" } }
            ]
        }
    }

	try {
        const resItem = await itemSlave.findAll({
            attributes: [ 'item_id', 'subject', 'wdate', 'pathname' ], 
            where,
            offset: Number(startpoint) * 10,
            limit: 10,
            order: [['wdate', 'desc']]
        })

        const resCount = await itemSlave.findOne({
            where,
            attributes: [ [sequelizeSlave.fn('count', '*'), 'count'] ]
        })

		res.json({rows: resItem, count: resCount.count})

	} catch(e) {
	
		throw e
	}
}