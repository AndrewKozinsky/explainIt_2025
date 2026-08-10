// import React from 'react'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import Button from '@/shared/ui/formRelated/buttons/Button/Button'
// import { getButtonText } from './fn/getButtonText'
// import { useGenerateSubtitles } from './fn/useGenerateSubtitles'
// import './GenerateSubtitlesButton.scss'

/*type GenerateSubtitlesButtonProps = {
	videoId: number
	disabled?: boolean
}*/

/*function GenerateSubtitlesButton(props: GenerateSubtitlesButtonProps) {
	const { videoId, disabled } = props
	const { status, generationError, isGenerating, generate } = useGenerateSubtitles(videoId)

	const buttonText = getButtonText(status)

	return (
		<div className='generate-subtitles-button'>
			<Button onClick={generate} disabled={disabled || isGenerating} loading={isGenerating}>
				{buttonText}
			</Button>
			{status === 'failed' && generationError && <ErrorMessage text={generationError ?? null} />}
		</div>
	)
}*/

// export default GenerateSubtitlesButton
