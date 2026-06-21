import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { SubtitlesGenerationStatus } from '@/graphql'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { getButtonText } from '_pages/media/video/editPrivateVideo/GenerateSubtitlesButton/fn/getButtonText'
import { useGenerateSubtitles } from './fn/useGenerateSubtitles'
import './GenerateSubtitlesButton.scss'

type GenerateSubtitlesButtonProps = {
	disabled?: boolean
}

function GenerateSubtitlesButton(props: GenerateSubtitlesButtonProps) {
	const { disabled } = props
	const { status, generationError, isGenerating, generate } = useGenerateSubtitles()

	const buttonText = getButtonText(status)

	return (
		<div className='generate-subtitles-button'>
			<Button onClick={generate} disabled={disabled || isGenerating} loading={isGenerating}>
				{buttonText}
			</Button>
			{status === SubtitlesGenerationStatus.Failed && generationError && <ErrorMessage text={generationError} />}
		</div>
	)
}

export default GenerateSubtitlesButton
