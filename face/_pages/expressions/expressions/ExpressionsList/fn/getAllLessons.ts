import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const TEXTBOOKS_DIR = path.join(process.cwd(), 'textbooks/ruUser/en')

export type LessonMeta = {
	lesson_id: string
	title: string
	slug: string
	order: number
}

export async function getAllLessons(subDir: string): Promise<LessonMeta[]> {
	const lessonsDir = path.join(TEXTBOOKS_DIR, subDir)

	if (!fs.existsSync(lessonsDir)) {
		return []
	}

	const files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith('.mdx'))

	const lessons = files.map((filename) => {
		const filePath = path.join(lessonsDir, filename)
		const raw = fs.readFileSync(filePath, 'utf-8')
		const { data } = matter(raw)

		return data as LessonMeta
	})

	return lessons.sort((a, b) => a.order - b.order)
}
