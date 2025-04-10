import { ITranscription } from '../../../transcriptionService/transcriptions'

export function getComponentTexts(transcriptionData: ITranscription) {
	return {
		engWords: transcriptionData.sentence.split(' '),
		transcriptionWords: transcriptionData.transcription.split(' '),
	}
}
