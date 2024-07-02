import  { dbSlave, sequelizeSlave } from 'model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const itemSlave = dbSlave['item']
const commentSlave = dbSlave['comment']

export default async(req, res) => {
	if (req.method !== 'GET')  throw new Error('req.method wrong')

    const { category, startpoint, search } = req.query

	try {
        let replacements = { kind: category }
        if (search) replacements = { ...replacements, search: `%${String(search).trim()}%` }

        const sql = `select A.item_id, A.subject, A.summary, A.thumbnail, A.wdate, A.love as loveCount, A.pathname, ifnull(B.commentCount, 0) as commentCount
                    from item as A left join (select item_id, count(*) as commentCount from comment group by item_id) as B
                    on A.item_id=B.item_id where A.kind=:kind ${search ? 'and ( subject like :search or content like :search ) ' : ''} order by wdate desc limit ${ Number(startpoint) * 12}, 12
        `
        const resItem = await sequelizeSlave.query(sql, {replacements, type: sequelizeSlave.QueryTypes.SELECT })

        const sqlCount = `select count(*) as count from item where kind=:kind ${search ? 'and ( subject like :search or content like :search ) ' : ''}`
        const resCount = await sequelizeSlave.query(sqlCount, {replacements, type: sequelizeSlave.QueryTypes.SELECT })

		res.json({rows: resItem, count: resCount[0].count})

	} catch(e) {
	
		throw e
	}
}