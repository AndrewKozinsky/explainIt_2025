// import React from 'react'
// import { SubtitlesGenerationStatus } from '@/graphql'
// import Button from '@/ui/formRelated/buttons/Button/Button'
// import { useGenerateSubtitles } from './fn/useGenerateSubtitles'

/*type GenerateSubtitlesButtonProps = {
	disabled?: boolean
}*/

/*function GenerateSubtitlesButton(props: GenerateSubtitlesButtonProps) {
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
}*/

/*function getButtonText(status: SubtitlesGenerationStatus) {
	if (status === SubtitlesGenerationStatus.Pending) {
		return 'Ожидает обработки'
	}

	if (status === SubtitlesGenerationStatus.Processing) {
		return 'Генерируем субтитры'
	}

	if (status === SubtitlesGenerationStatus.Failed) {
		return 'Повторить генерацию субтитров'
	}

	if (status === SubtitlesGenerationStatus.Done) {
		return 'Сгенерировать субтитры заново'
	}

	return 'Сгенерировать субтитры'
}*/

// export default GenerateSubtitlesButton
