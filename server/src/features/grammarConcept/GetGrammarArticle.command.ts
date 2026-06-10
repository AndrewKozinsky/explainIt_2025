import * as fs from 'fs'
import * as path from 'path'
import { compile } from '@mdx-js/mdx'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import matter = require('gray-matter')

export class GetGrammarArticleCommand implements ICommand {
	constructor(
		public input: {
			sourceLanguage: string
			targetLanguage: string
			category: string
			slug: string
		},
	) {}
}

@CommandHandler(GetGrammarArticleCommand)
export class GetGrammarArticleHandler implements ICommandHandler<GetGrammarArticleCommand> {
	async execute(command: GetGrammarArticleCommand) {
		const { sourceLanguage, targetLanguage, category, slug } = command.input
		const cwd = process.cwd()
		const contentRoots = [path.join(cwd, 'content'), path.join(cwd, '..', 'content')]
		let categoryDir = ''

		for (const root of contentRoots) {
			const dir = path.join(root, targetLanguage, sourceLanguage, category)

			if (fs.existsSync(dir)) {
				categoryDir = dir
				break
			}
		}

		if (!categoryDir) {
			return { title: slug, content: '', compiledSource: '' }
		}

		const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.mdx'))

		for (const filename of files) {
			const filePath = path.join(categoryDir, filename)
			const raw = fs.readFileSync(filePath, 'utf-8')
			const { data, content } = matter(raw)

			const fileSlug = (data as any).slug || filename.replace(/\.mdx$/, '')
			if (fileSlug === slug) {
				const compiled = await compile(content, {
					outputFormat: 'function-body',
					providerImportSource: '@mdx-js/react',
					development: process.env.NODE_ENV !== 'production',
				})

				return {
					title: (data as any).title || slug,
					content,
					compiledSource: String(compiled.value),
				}
			}
		}

		return { title: slug, content: '', compiledSource: '' }
	}
}
