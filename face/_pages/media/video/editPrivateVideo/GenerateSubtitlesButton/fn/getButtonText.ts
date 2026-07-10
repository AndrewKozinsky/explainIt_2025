import { VideoPrivateSubtitlesStatusOutModelStatus } from '@/shared/api/generated/models'

export function getButtonText(status: VideoPrivateSubtitlesStatusOutModelStatus) {
	if (status === VideoPrivateSubtitlesStatusOutModelStatus.pending) {
		return 'Ожидает обработки'
	}

	if (status === VideoPrivateSubtitlesStatusOutModelStatus.processing) {
		return 'Генерируем субтитры'
	}

	if (status === VideoPrivateSubtitlesStatusOutModelStatus.failed) {
		return 'Повторить генерацию субтитров'
	}

	if (status === VideoPrivateSubtitlesStatusOutModelStatus.done) {
		return 'Сгенерировать субтитры заново'
	}

	return 'Сгенерировать субтитры'
}
