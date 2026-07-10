import React from 'react'
import { VideoPrivateSubtitlesStatusOutModelStatus } from '@/shared/api/generated/models'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
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
			{status === VideoPrivateSubtitlesStatusOutModelStatus.failed && generationError && (
				<ErrorMessage text={(generationError as unknown as string) ?? null} />
			)}
		</div>
	)
}

export default GenerateSubtitlesButton
