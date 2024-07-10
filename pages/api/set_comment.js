import  db from 'model'
import { v4 as uuidv4 } from 'uuid'

const comment = db['comment']

export default async(req, res) => {
	if (req.method !== 'POST')  throw new Error('req.method wrong')

    try {
        const { item_id, name, content } = req.body

        const comment_id = uuidv4()

        await comment.create({
            comment_id,
            item_id,
            name,
            content,
            auto: false
        })

        res.json({ id: comment_id })
    } catch (e) {
        res.json({ id: 0 })
    }
    
}