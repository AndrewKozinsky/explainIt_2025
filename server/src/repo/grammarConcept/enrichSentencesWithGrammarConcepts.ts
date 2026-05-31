import { PrismaService } from 'db/prisma.service'
import { normalizeSentence } from 'features/grammarConcept/normalizeSentence'
import { GrammarConceptQueryRepository } from '../grammarConcept.queryRepository'

export async function enrichSentencesWithGrammarConcepts(params: {
	prisma: PrismaService
	grammarConceptQueryRepo: GrammarConceptQueryRepository
	sentences: { id: number; startOffset: number; length: number }[]
	content: string
	sourceLanguageCode: string
	targetLanguageCode: string
}): Promise<
	{
		grammarConcepts: any[] | null
		missingGrammarConcepts: { category: string; lemma: string }[] | null
	}[]
> {
	const { prisma, grammarConceptQueryRepo, sentences, content, sourceLanguageCode, targetLanguageCode } = params

	return await Promise.all(
		sentences.map(async (s) => {
			const sentenceText = content.slice(
				Math.max(0, s.startOffset),
				Math.min(content.length, s.startOffset + Math.max(0, s.length)),
			)

			const universalPhrase = (await prisma.universalPhrase.findUnique({
				where: {
					source_language_code_text: {
						text: normalizeSentence(sentenceText),
						source_language_code: sourceLanguageCode as any,
					},
				},
				include: {
					GrammarConceptToUniversalPhrase: {
						include: { grammar_concept: true },
					},
					MissingGrammarConcept: {
						where: { target_language_code: targetLanguageCode as any },
						select: { category: true, lemma: true },
					},
				},
			})) as any

			if (universalPhrase && universalPhrase.grammarExtractionStatus === 'SUCCESS') {
				return {
					grammarConcepts: universalPhrase.GrammarConceptToUniversalPhrase.filter(
						(j: any) => j.grammar_concept.target_language_code === targetLanguageCode,
					).map((j: any) => grammarConceptQueryRepo.mapDbToOutModel(j.grammar_concept)),
					missingGrammarConcepts: universalPhrase.MissingGrammarConcept.map((m: any) => ({
						category: m.category,
						lemma: m.lemma,
					})),
				}
			}

			return { grammarConcepts: null, missingGrammarConcepts: null }
		}),
	)
}
