import { readdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = join(process.cwd(), 'content')

export function getContentDir(): string {
	return CONTENT_DIR
}

export { getCategoryDisplayName } from 'utils/categoryDisplayNames'

// ── Чтение файловой структуры ────────────────────────────────────────────────

/**
 * Возвращает коды языков, доступных для изучения при выбранной локали.
 * Пример: для locale='ru' при наличии content/ru/en/ вернёт ['en'].
 */
export function getAvailableLanguages(locale: string): string[] {
	const dir = join(CONTENT_DIR, locale)
	if (!existsSync(dir)) return []

	return readdirSync(dir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
}

/**
 * Возвращает названия категорий (групп статей) для заданной локали и изучаемого языка.
 * Пример: для locale='ru', targetLanguage='en' вернёт ['phrasal_verb', 'expression'].
 */
export function getCategories(locale: string, targetLanguage: string): string[] {
	const dir = join(CONTENT_DIR, locale, targetLanguage)
	if (!existsSync(dir)) return []

	return readdirSync(dir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
}

/**
 * Возвращает имена файлов статей (.mdx) для заданной локали, изучаемого языка и категории.
 * Пример: вернёт ['1_comeAcross.mdx', '2_goOn.mdx', ...].
 */
export function getArticleFiles(locale: string, targetLanguage: string, category: string): string[] {
	const dir = join(CONTENT_DIR, locale, targetLanguage, category)
	if (!existsSync(dir)) return []

	return readdirSync(dir).filter((filename) => filename.endsWith('.mdx'))
}

// ── Чтение метаданных статей ──────────────────────────────────────────────────

export type ArticleMeta = {
	title: string
	slug: string
	order: number
	category: string
}

/**
 * Читает метаданные (frontmatter) из .mdx файла статьи.
 * Имя файла должно совпадать со slug: articleSlug.mdx
 * Возвращает null если файл не найден или не содержит frontmatter.
 */
export function getArticleMeta(
	locale: string,
	sourceLanguage: string,
	category: string,
	articleSlug: string,
): ArticleMeta | null {
	const filePath = join(CONTENT_DIR, locale, sourceLanguage, category, `${articleSlug}.mdx`)
	if (!existsSync(filePath)) return null

	try {
		const raw = readFileSync(filePath, 'utf-8')
		const { data } = matter(raw)

		return {
			title: data.title ?? articleSlug,
			slug: articleSlug,
			order: data.order ?? 0,
			category: data.category ?? category,
		}
	} catch {
		return null
	}
}
