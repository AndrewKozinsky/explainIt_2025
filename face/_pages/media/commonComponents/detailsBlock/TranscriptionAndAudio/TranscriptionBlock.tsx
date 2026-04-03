import React from 'react'
import { ErrorIcon } from 'ui/icons/ErrorIcon/ErrorIcon'
import Spinner from 'ui/Spinner/Spinner'
import { TranscriptionData } from '_pages/media/commonComponents/detailsBlock/TranscriptionAndAudio/fn/useGetAudioAndTranscription'

type TranscriptionBlockProps = {
	transcription: TranscriptionData
}

export function TranscriptionBlock(props: TranscriptionBlockProps) {
	const { transcription } = props

	if (transcription.status === 'loading') {
		return <Spinner size='extra-small' />
	}

	if (transcription.status === 'error') {
		return <ErrorIcon extraClass='transcription-audio__error-icon' />
	}

	if (!transcription.ipa) return null

	return <span className='transcription-audio__ipa'>{transcription.ipa}</span>
}
