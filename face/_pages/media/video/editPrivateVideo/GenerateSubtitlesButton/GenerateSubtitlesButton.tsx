import React from 'react'
import { SubtitlesGenerationStatus } from '@/graphql'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { getButtonText } from '_pages/media/video/editPrivateVideo/GenerateSubtitlesButton/fn/getButtonText'
import { useGenerateSubtitles } from './fn/useGenerateSubtitles'

type GenerateSubtitlesButtonProps = {
	disabled?: boolean
}

function GenerateSubtitlesButton(props: GenerateSubtitlesButtonProps) {
	const { disabled } = props
	const { status, generationError, isGenerating, generate } = useGenerateSubtitles()

	const buttonText = getButtonText(status)

	return (
		<div>
			<Button onClick={generate} disabled={disabled || isGenerating} loading={isGenerating}>
				{buttonText}
			</Button>
			{status === SubtitlesGenerationStatus.Failed && generationError && <p>{generationError}</p>}
		</div>
	)
}

export default GenerateSubtitlesButton
