import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { GrammarConceptRepository } from 'repo/grammarConcept.repository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UniversalPhraseServiceModel } from 'models/grammarConcept/grammarConcept.service.model'
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
		private universalPhraseRepo: UniversalPhraseRepository,
		private grammarExtractionService: GrammarExtractionService,
	) {}

	async execute(command: FetchGrammarConceptsCommand): Promise<UniversalPhraseServiceModel> {
		const { sentenceText, sourceLanguage, targetLanguage } = command.input

		const universalPhrase = await this.universalPhraseRepo.findOrCreate({
			sentenceText,
			sourceLanguage,
		})

		if (universalPhrase.grammarExtractionStatus === 'SUCCESS') {
			return universalPhrase
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

			const missingItems = concepts
				.filter(
					(concept) =>
						!foundConcepts.some(
							(gc) =>
								gc.category === concept.category &&
								(gc.lemma === concept.lemma || gc.aliases.includes(concept.lemma)),
						),
				)
				.map((c) => ({
					sourceLanguage,
					targetLanguage,
					category: c.category,
					lemma: c.lemma,
					sentenceText,
				}))

			await this.universalPhraseRepo.completeExtraction(universalPhrase.id, foundIds, missingItems)

			const updated = await this.universalPhraseRepo.findByIdWithRelations(universalPhrase.id)
			if (!updated) {
				throw new Error('Failed to load updated UniversalPhrase')
			}

			return updated
		} catch (error) {
			await this.universalPhraseRepo.updateStatus(universalPhrase.id, 'ERROR')
			throw error
		}
	}
}
