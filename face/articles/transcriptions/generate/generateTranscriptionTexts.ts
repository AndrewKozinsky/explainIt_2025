import graphqlAIQueries from '../../../graphql/ai/graphqlAIQueries'
import { wait } from '../../../utils/utils'
import { transcriptions } from '../transcriptions'

generateTranscriptionTexts()

async function generateTranscriptionTexts() {
	for (let transcriptionItem of Object.values(transcriptions)) {
		if (!transcriptionItem.transcription) {
			const engSentence = transcriptionItem.sentence

			const transcription = await getTranscription(engSentence)
			writeTranscriptionInFile()

			await wait(5000)
		}
	}
}

async function getTranscription(engSentence: string) {
	const { data } = await graphqlAIQueries.getTranscription({
		engSentence,
	})

	if ('error' in data.ai_getTranscription) {
		return 'WRONG TRANSCRIPTION'
	}

	return data.ai_getTranscription.transcription || 'WRONG TRANSCRIPTION'
}

function writeTranscriptionInFile() {}
