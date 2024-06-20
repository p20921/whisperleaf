import  db, { dbSlave, sequelize, sequelizeSlave } from 'model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const item = db['item']
const itemSlave = dbSlave['item']

export default async(req, res) => {
	if (req.method !== 'GET')  throw new Error('req.method wrong')

    try {
        const { item_id, sign } = req.query

        let where = { item_id }

        await item.update(
            { love: sign === "1" ? sequelize.literal('love + 1') : sequelize.literal('love - 1') },
            { where }
        )

        const resItem = await itemSlave.findOne({
            attributes: [ 'love' ],
            where
        })

        res.json(resItem.love)
    } catch (e) {
        res.json(0)
    }
    
}