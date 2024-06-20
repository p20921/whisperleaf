import  db from 'model'
import { v4 as uuidv4 } from 'uuid'

const comment = db['comment']

export default async(req, res) => {
	if (req.method !== 'POST')  throw new Error('req.method wrong')

    try {
        const { comment_id } = req.body

        await comment.destory({
           where: { comment_id }
        })

        res.json(1)
    } catch (e) {
        res.json(0)
    }
    
}