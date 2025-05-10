import graphqlAIQueries from '../../../graphql/ai/graphqlAIQueries'
import { wait } from '../../../utils/utils'
import { transcriptions } from '../transcriptions'
import { updateTranscriptionBlockInFile } from './updateTranscriptionBlockInFile'

generateTranscriptionTexts()

async function generateTranscriptionTexts() {
	for (let key in transcriptions) {
		const transcriptionItemKey = key as keyof typeof transcriptions
		const transcriptionItem = transcriptions[transcriptionItemKey]

		if (!transcriptionItem.transcription) {
			const engSentence = transcriptionItem.sentence

			const transcription = await getSentenceTranscriptionFromServer(engSentence)
			await updateTranscriptionBlockInFile(transcriptionItemKey, { transcription })

			// Wait some time not to make requests to GigaChat so fast
			await wait(6000)
		}
	}
}

async function getSentenceTranscriptionFromServer(engSentence: string) {
	const { data } = await graphqlAIQueries.getTranscription({
		engSentence,
	})

	if ('error' in data.ai_getTranscription) {
		return 'WRONG TRANSCRIPTION'
	}

	return data.ai_getTranscription.transcription || 'WRONG TRANSCRIPTION'
}
