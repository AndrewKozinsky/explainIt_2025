import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getContentDir } from './getContentDir'

export type LessonMeta = {
	lesson_id: string
	title: string
	slug: string
	order: number
	category: string
	sourceLanguage: string
	targetLanguage: string
}

export async function getAllLessons(sourceLanguage: string, category: string): Promise<LessonMeta[]> {
	const contentDir = getContentDir()
	const entries = fs.readdirSync(contentDir, { withFileTypes: true })

	for (const entry of entries) {
		if (!entry.isDirectory()) continue

		const targetLang = entry.name
		const categoryDir = path.join(contentDir, targetLang, sourceLanguage, category)

		if (fs.existsSync(categoryDir)) {
			const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.mdx'))

			return files
				.map((filename) => {
					const filePath = path.join(categoryDir, filename)
					const raw = fs.readFileSync(filePath, 'utf-8')
					const { data } = matter(raw)

					return data as LessonMeta
				})
				.sort((a, b) => a.order - b.order)
		}
	}

	return []
}
