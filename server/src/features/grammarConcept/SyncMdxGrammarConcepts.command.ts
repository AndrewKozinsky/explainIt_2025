import { randomUUID } from 'crypto'
import { readFileSync, readdirSync, existsSync, writeFileSync, statSync } from 'fs'
import { join, extname } from 'path'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import matter = require('gray-matter')
import { GrammarConceptRepository } from 'repo/grammarConcept.repository'
import { PrismaService } from 'db/prisma.service'

type MdxFrontmatter = {
	lesson_id: string
	title: string
	slug: string
	order: number
	category: string
	sourceLanguage: string
	targetLanguage: string
	aliases?: string[]
}

export class SyncMdxGrammarConceptsCommand implements ICommand {
	constructor() {}
}

@CommandHandler(SyncMdxGrammarConceptsCommand)
export class SyncMdxGrammarConceptsHandler implements ICommandHandler<SyncMdxGrammarConceptsCommand> {
	constructor(
		private grammarConceptRepo: GrammarConceptRepository,
		private prisma: PrismaService,
	) {}

	async execute(): Promise<void> {
		const contentDir = this.findContentDir()
		if (!contentDir) {
			return
		}

		const mdxFiles = this.scanMdxFiles(contentDir)

		// Ensure no duplicate lesson_ids — keep the oldest file, clear others
		this.deduplicateLessonIds(mdxFiles)

		const seenIds = new Set<string>()
		const fileData: { file: string; frontmatter: MdxFrontmatter; lessonId: string }[] = []

		// First pass: collect all data and generate missing UUIDs
		for (const file of mdxFiles) {
			const frontmatter = this.parseFrontmatter(file)
			if (!frontmatter) continue

			let lessonId = frontmatter.lesson_id
			if (!lessonId) {
				lessonId = randomUUID()
				this.writeLessonIdToFile(file, lessonId)
			}
			seenIds.add(lessonId)
			fileData.push({ file, frontmatter, lessonId })
		}

		// Delete records that no longer have corresponding files
		if (seenIds.size > 0) {
			await this.grammarConceptRepo.deleteNotInIds(Array.from(seenIds))
		}

		// Second pass: create or update records
		for (const { frontmatter, lessonId } of fileData) {
			const result = await this.grammarConceptRepo.upsertByLessonId({
				id: lessonId,
				sourceLanguageCode: frontmatter.sourceLanguage,
				targetLanguageCode: frontmatter.targetLanguage,
				category: frontmatter.category,
				title: frontmatter.title,
				slug: frontmatter.slug,
				order: frontmatter.order,
				aliases: frontmatter.aliases ?? [],
			})
			// Track the actual DB id (may differ from file's lessonId if upsert matched by unique combo)
			seenIds.add(result.id)
		}

		await this.resolveMissingConcepts()
	}

	private findContentDir(): string | null {
		const candidates = [join(process.cwd(), 'content'), join(process.cwd(), '..', 'content')]

		for (const dir of candidates) {
			if (existsSync(dir)) return dir
		}

		return null
	}

	private scanMdxFiles(dir: string): string[] {
		const results: string[] = []

		function walk(currentDir: string) {
			const entries = readdirSync(currentDir, { withFileTypes: true })
			for (const entry of entries) {
				const fullPath = join(currentDir, entry.name)
				if (entry.isDirectory()) {
					walk(fullPath)
				} else if (entry.isFile() && extname(entry.name) === '.mdx') {
					results.push(fullPath)
				}
			}
		}

		walk(dir)
		return results
	}

	private parseFrontmatter(filePath: string): MdxFrontmatter | null {
		try {
			const raw = readFileSync(filePath, 'utf-8')
			const { data } = matter(raw)

			if (!data.title || !data.slug || !data.category || !data.sourceLanguage || !data.targetLanguage) {
				return null
			}

			return {
				lesson_id: data.lesson_id || '',
				title: data.title,
				slug: data.slug,
				order: data.order ?? 0,
				category: data.category,
				sourceLanguage: data.sourceLanguage,
				targetLanguage: data.targetLanguage,
				aliases: data.aliases ?? [],
			}
		} catch {
			return null
		}
	}

	private writeLessonIdToFile(filePath: string, lessonId: string): void {
		const raw = readFileSync(filePath, 'utf-8')
		const updated = raw.replace(/lesson_id:\s*""/, `lesson_id: "${lessonId}"`)
		writeFileSync(filePath, updated, 'utf-8')
	}

	/**
	 * If several .mdx files share the same lesson_id, keep it in the oldest file
	 * (by creation time) and clear it in the rest. The cleared files will get
	 * new UUIDs in the first pass below.
	 */
	private deduplicateLessonIds(mdxFiles: string[]): void {
		const byLessonId = new Map<string, { path: string; birthtime: number }[]>()

		for (const file of mdxFiles) {
			const lessonId = this.extractLessonId(file)
			if (!lessonId) continue

			if (!byLessonId.has(lessonId)) {
				byLessonId.set(lessonId, [])
			}

			const birthtime = statSync(file).birthtime.getTime()
			byLessonId.get(lessonId)!.push({ path: file, birthtime })
		}

		for (const [lessonId, entries] of byLessonId) {
			if (entries.length <= 1) continue

			entries.sort((a, b) => a.birthtime - b.birthtime)

			const [keep, ...duplicates] = entries

			console.log(
				`[SyncMdxGrammarConcepts] Duplicate lesson_id "${lessonId}": ` +
					`keeping "${keep.path}" (oldest), clearing ${duplicates.length} duplicate(s)`,
			)

			for (const dup of duplicates) {
				console.log(`  → Clearing lesson_id in: ${dup.path}`)
				this.clearLessonIdInFile(dup.path)
			}
		}
	}

	/** Extracts lesson_id from frontmatter without full parsing. */
	private extractLessonId(filePath: string): string | null {
		try {
			const raw = readFileSync(filePath, 'utf-8')
			const match = raw.match(/lesson_id:\s*"([^"]*)"/)
			return match?.[1] || null
		} catch {
			return null
		}
	}

	/** Replaces any lesson_id value with an empty string so it gets regenerated. */
	private clearLessonIdInFile(filePath: string): void {
		const raw = readFileSync(filePath, 'utf-8')
		const updated = raw.replace(/lesson_id:\s*"[^"]*"/, 'lesson_id: ""')
		writeFileSync(filePath, updated, 'utf-8')
	}

	private async resolveMissingConcepts(): Promise<void> {
		const missingRecords = await this.prisma.missingGrammarConcept.findMany({
			select: {
				id: true,
				source_language_code: true,
				target_language_code: true,
				category: true,
				alias: true,
				universal_phrase_id: true,
			},
		})

		console.log(`[resolveMissingConcepts] Found ${missingRecords.length} missing concept(s)`)
		for (const missing of missingRecords) {
			console.log(
				`[resolveMissingConcepts] Looking for: source=${missing.source_language_code} target=${missing.target_language_code} category="${missing.category}" alias="${missing.alias}"`,
			)
			const grammarConcept = await this.prisma.grammarConcept.findFirst({
				where: {
					source_language_code: missing.source_language_code,
					target_language_code: missing.target_language_code,
					category: missing.category,
					aliases: { has: missing.alias },
				},
			})

			if (grammarConcept) {
				console.log(
					`[resolveMissingConcepts] MATCHED: missing alias="${missing.alias}" → article "${grammarConcept.title}" (aliases=[${grammarConcept.aliases.join(', ')}], id=${grammarConcept.id})`,
				)
				await this.prisma.$transaction([
					this.prisma.grammarConceptToUniversalPhrase.create({
						data: {
							grammar_concept_id: grammarConcept.id,
							universal_phrase_id: missing.universal_phrase_id,
						},
					}),
					this.prisma.missingGrammarConcept.delete({
						where: { id: missing.id },
					}),
				])
			}
		}
	}
}
