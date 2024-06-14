import notionConfig from 'config/notion.json'
import { Client } from '@notionhq/client'
import { getProperty } from './notion_title'

const { secret } = notionConfig

export default async(req, res) => {
	const { words } = req.query

	if (!words) {
		res.json([])
		return
	}

	const trimWords = words.trim()

	if (!trimWords) {
		res.json([])
		return
	}

	const notion = new Client({ auth: secret });

	const response = await notion.search({
		query: trimWords,
		filter: {
		value: 'page',
		property: 'object'
		},
		sort: {
			direction: 'ascending',
			timestamp: 'last_edited_time'
		},
	})

	res.json(response.results.map(c => {
		return getProperty(c)
	}))
}