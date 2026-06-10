import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getLocale } from 'next-intl/server'
import { getContentDir } from '@/utils/contentFolder'

export type LessonMeta = {
	lesson_id: string
	title: string
	slug: string
	order: number
	category: string
	sourceLanguage: string
	targetLanguage: string
}

export type LessonFile = {
	frontmatter: LessonMeta
	content: string
}

export async function getLessonBySlug(
	sourceLanguage: string,
	category: string,
	slug: string,
): Promise<LessonFile | null> {
	const locale = await getLocale()
	const filePath = join(getContentDir(), locale, sourceLanguage, category, `${slug}.mdx`)

	if (!existsSync(filePath)) return null

	const raw = readFileSync(filePath, 'utf-8')
	const { data, content } = matter(raw)

	return {
		frontmatter: { ...data, slug } as LessonMeta,
		content,
	}
}
