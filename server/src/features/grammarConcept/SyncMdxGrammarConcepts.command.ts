import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import matter = require('gray-matter')
import { PrismaService } from '../../db/prisma.service'
import { GrammarConceptRepository } from '../../repo/grammarConcept.repository'

type MdxFrontmatter = {
	lesson_id: string
	title: string
	slug: string
	order: number
	category: string
	lemma: string
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

		const seenIds = new Set<string>()

		for (const file of mdxFiles) {
			const frontmatter = this.parseFrontmatter(file)
			if (!frontmatter) continue

			seenIds.add(frontmatter.lesson_id)

			await this.grammarConceptRepo.upsertByLessonId({
				id: frontmatter.lesson_id,
				sourceLanguageCode: frontmatter.sourceLanguage,
				targetLanguageCode: frontmatter.targetLanguage,
				category: frontmatter.category,
				lemma: frontmatter.lemma,
				title: frontmatter.title,
				slug: frontmatter.slug,
				order: frontmatter.order,
				aliases: frontmatter.aliases ?? [],
			})
		}

		if (seenIds.size > 0) {
			await this.grammarConceptRepo.deleteNotInIds(Array.from(seenIds))
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

			if (
				!data.lesson_id ||
				!data.title ||
				!data.slug ||
				!data.category ||
				!data.lemma ||
				!data.sourceLanguage ||
				!data.targetLanguage
			) {
				return null
			}

			return {
				lesson_id: data.lesson_id,
				title: data.title,
				slug: data.slug,
				order: data.order ?? 0,
				category: data.category,
				lemma: data.lemma,
				sourceLanguage: data.sourceLanguage,
				targetLanguage: data.targetLanguage,
				aliases: data.aliases ?? [],
			}
		} catch {
			return null
		}
	}

	private async resolveMissingConcepts(): Promise<void> {
		const missingRecords = await this.prisma.missingGrammarConcept.findMany({
			select: {
				id: true,
				source_language_code: true,
				target_language_code: true,
				category: true,
				lemma: true,
				universal_sentence_id: true,
			},
		})

		for (const missing of missingRecords) {
			const grammarConcept = await this.prisma.grammarConcept.findFirst({
				where: {
					source_language_code: missing.source_language_code,
					target_language_code: missing.target_language_code,
					category: missing.category,
					OR: [
						{ lemma: missing.lemma },
						{ aliases: { has: missing.lemma } },
					],
				},
			})

			if (grammarConcept) {
				await this.prisma.$transaction([
					this.prisma.grammarConceptToUniversalSentence.create({
						data: {
							grammar_concept_id: grammarConcept.id,
							universal_sentence_id: missing.universal_sentence_id,
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
