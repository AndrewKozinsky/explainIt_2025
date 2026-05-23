import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const LESSONS_DIR = path.join(process.cwd(), 'textbooks/ruUser/en/expressions')

export type LessonMeta = {
	lesson_id: string
	title: string
	slug: string
	order: number
}

export async function getAllLessons(): Promise<LessonMeta[]> {
	const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.mdx'))

	const lessons = files.map((filename) => {
		const filePath = path.join(LESSONS_DIR, filename)
		const raw = fs.readFileSync(filePath, 'utf-8')
		const { data } = matter(raw)

		return data as LessonMeta
	})

	return lessons.sort((a, b) => a.order - b.order)
}
