import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { LessonMeta } from '@/_pages/expressions/expressions/ExpressionsList/fn/getAllLessons'

const TEXTBOOKS_DIR = path.join(process.cwd(), 'textbooks/ruUser/en')
const SUB_DIRS = ['expressions', 'phrasalVerbs']

export type LessonFile = {
	frontmatter: LessonMeta
	content: string
}

export async function getLessonBySlug(slug: string): Promise<LessonFile | null> {
	for (const subDir of SUB_DIRS) {
		const lessonsDir = path.join(TEXTBOOKS_DIR, subDir)

		if (!fs.existsSync(lessonsDir)) continue

		const files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith('.mdx'))

		for (const filename of files) {
			const filePath = path.join(lessonsDir, filename)
			const raw = fs.readFileSync(filePath, 'utf-8')
			const { data, content } = matter(raw)

			if ((data as LessonMeta).slug === slug) {
				return { frontmatter: data as LessonMeta, content }
			}
		}
	}

	return null
}
