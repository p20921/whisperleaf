import { NotionAPI } from 'notion-client'
import notionConfig from 'config/notion.json'

const { rootPageId, token, user } = notionConfig

export default async(req, res) => {
	const { id } = req.body 

	try {
		const api = new NotionAPI({ 
			authToken: token, 
			activeUser: user 
		})

		// recordMap
		const recordMap = await api.getPage(id || rootPageId)
	
		res.json(recordMap) 		
	} catch (e) {
		throw e
	}

}