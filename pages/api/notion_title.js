import { Client } from '@notionhq/client'
import notionConfig from 'config/notion.json'

const { secret } = notionConfig

export const getProperty = (response) => {
	const iconProperty= {
		type: '',
		value: ''
	}

	const { id, icon, properties } = response

	if (icon) {
		iconProperty["type"] = icon.type
		
		if (icon.type === 'file') iconProperty["value"] = icon.file.url
		else iconProperty["value"] = icon.emoji
	}

	let content = ''

	if (typeof properties.title === 'object') {
		const { title } = properties
		const { title: subTitle } = title
		const { text } = subTitle[0]
		content = text.content
	}

	return {
		id, 
		iconProperty,
		title: content
	}
}

export default async(req, res) => {
	try { 
		const { id } = req.body 
	
		const notion = new Client({ auth: secret })
	
		const response = await notion.pages.retrieve({ page_id: id })
		
		res.json(getProperty(response)) 		
	} catch (error) {
		throw error
	}
}