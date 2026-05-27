import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalSentenceServiceModel } from 'models/grammarConcept/grammarConcept.service.model'
import { GrammarConceptRepository } from '../../repo/grammarConcept.repository'
import { UniversalSentenceRepository } from '../../repo/universalSentence.repository'
import { GrammarExtractionService } from './grammarExtraction.service'

export class FetchGrammarConceptsCommand implements ICommand {
	constructor(
		public input: {
			sentenceText: string
			sourceLanguage: string
			targetLanguage: string
		},
	) {}
}

@CommandHandler(FetchGrammarConceptsCommand)
export class FetchGrammarConceptsHandler implements ICommandHandler<FetchGrammarConceptsCommand> {
	constructor(
		private grammarConceptRepo: GrammarConceptRepository,
		private universalSentenceRepo: UniversalSentenceRepository,
		private grammarExtractionService: GrammarExtractionService,
	) {}

	async execute(command: FetchGrammarConceptsCommand): Promise<UniversalSentenceServiceModel> {
		const { sentenceText, sourceLanguage, targetLanguage } = command.input

		const universalSentence = await this.universalSentenceRepo.findOrCreate({
			sentenceText,
			sourceLanguage,
		})

		if (universalSentence.status === 'SUCCESS') {
			return universalSentence
		}

		try {
			const concepts = await this.grammarExtractionService.extractConcepts({
				sentenceText,
				sourceLanguage,
			})

			const foundConcepts = await this.grammarConceptRepo.findByLemmas({
				sourceLanguage,
				targetLanguage,
				items: concepts,
			})

			const foundIds = foundConcepts.map((c) => c.id)
			const foundKeys = new Set(foundConcepts.map((c) => `${c.category}:${c.lemma}`))

			const missingItems = concepts
				.filter((c) => !foundKeys.has(`${c.category}:${c.lemma}`))
				.map((c) => ({
					sourceLanguage,
					targetLanguage,
					category: c.category,
					lemma: c.lemma,
					sentenceText,
				}))

			await this.universalSentenceRepo.completeExtraction(universalSentence.id, foundIds, missingItems)

			const updated = await this.universalSentenceRepo.findByIdWithRelations(universalSentence.id)
			if (!updated) {
				throw new Error('Failed to load updated UniversalSentence')
			}

			return updated
		} catch (error) {
			await this.universalSentenceRepo.updateStatus(universalSentence.id, 'ERROR')
			throw error
		}
	}
}
