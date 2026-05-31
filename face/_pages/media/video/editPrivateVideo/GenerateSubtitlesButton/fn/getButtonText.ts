import { SubtitlesGenerationStatus } from '@/graphql'

export function getButtonText(status: SubtitlesGenerationStatus) {
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
}
