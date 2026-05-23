import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { LessonMeta } from '@/_pages/expressions/expressions/ExpressionsList/fn/getAllLessons'

const LESSONS_DIR = path.join(process.cwd(), 'textbooks/ruUser/en/expressions')

export type LessonFile = {
	frontmatter: LessonMeta
	content: string
}

export async function getLessonBySlug(slug: string): Promise<LessonFile | null> {
	const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.mdx'))

	for (const filename of files) {
		const filePath = path.join(LESSONS_DIR, filename)
		const raw = fs.readFileSync(filePath, 'utf-8')
		const { data, content } = matter(raw)

		if ((data as LessonMeta).slug === slug) {
			return { frontmatter: data as LessonMeta, content }
		}
	}

	return null
}
