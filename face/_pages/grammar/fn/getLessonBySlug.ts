import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { LessonMeta } from './getAllLessons'
import { getContentDir } from './getContentDir'

export type LessonFile = {
	frontmatter: LessonMeta
	content: string
}

export async function getLessonBySlug(
	sourceLanguage: string,
	category: string,
	slug: string,
): Promise<LessonFile | null> {
	const contentDir = getContentDir()
	const entries = fs.readdirSync(contentDir, { withFileTypes: true })

	for (const entry of entries) {
		if (!entry.isDirectory()) continue

		const targetLang = entry.name
		const categoryDir = path.join(contentDir, targetLang, sourceLanguage, category)

		if (!fs.existsSync(categoryDir)) continue

		const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.mdx'))

		for (const filename of files) {
			const filePath = path.join(categoryDir, filename)
			const raw = fs.readFileSync(filePath, 'utf-8')
			const { data, content } = matter(raw)

			if ((data as LessonMeta).slug === slug) {
				return { frontmatter: data as LessonMeta, content }
			}
		}
	}

	return null
}
