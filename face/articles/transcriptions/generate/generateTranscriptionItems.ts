import { wait } from '../../../utils/utils'
import articles from '../../articlesData/articlesData'
import { transcriptions } from '../transcriptions'
import transcriptionService from '../transcriptionService'
import { addTranscriptionToFile } from './addTranscriptionToFile'

generateTranscriptionItems()

/**
 * Generates items in transcriptions object
 * in transcriptions.ts file.
 * */
async function generateTranscriptionItems() {
	// Get all English sentences
	let englishSentences = getEnglishSentences()
	clearEnglishSentences(englishSentences)

	// Remove sentences that have transcription in transcriptions.ts
	englishSentences.forEach((sentence) => {
		// I learn English. -> i_learn_english
		const sentenceKey = transcriptionService.cleanString(sentence)

		if (transcriptions[sentenceKey]) {
			englishSentences.delete(sentence)
		}
	})

	// Add new transcription item in the transcriptions object
	for (const sentence of englishSentences) {
		// I learn English. -> i_learn_english
		const sentenceKey = transcriptionService.cleanString(sentence)

		addTranscriptionToFile({
			key: sentenceKey,
			engSentence: sentence,
			transcription: '',
			audio: false,
		})

		await wait(5000)
	}
}

function getEnglishSentences() {
	const allEnglishSentences = new Set<string>()

	articles.forEach((article) => {
		article.content.forEach((componentData) => {
			if (componentData.type === 'rusToEng') {
				const englishSentence = componentData.eng.reduce((acc, textElem) => {
					return (acc += textElem.text)
				}, '')

				allEnglishSentences.add(englishSentence)
			}
		})
	})

	return allEnglishSentences
}

function clearEnglishSentences(englishSentences: Set<string>) {
	englishSentences.forEach((sentence) => {
		const cleanSentence = cleanAndCropText(sentence)
		englishSentences.add(cleanSentence)
	})
}

function cleanAndCropText(input: string): string {
	return (
		input
			// Remove parentheses
			.replace(/[()]/g, '')
			// Remove all non-Latin letters (but keep punctuation and spaces)
			.replace(/[^\p{Script=Latin}\p{P}\s]/gu, '')
			// Replace multiple spaces with a single space
			.replace(/\s+/g, ' ')
			// Trim spaces at beginning and end
			.trim()
	)
}
