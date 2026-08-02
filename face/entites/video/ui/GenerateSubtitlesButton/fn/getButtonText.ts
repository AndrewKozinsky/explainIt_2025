export function getButtonText(status: string | null): string {
	if (status === 'pending') {
		return 'Ожидает обработки'
	}

	if (status === 'processing') {
		return 'Генерируем субтитры'
	}

	if (status === 'failed') {
		return 'Повторить генерацию субтитров'
	}

	if (status === 'done') {
		return 'Сгенерировать субтитры заново'
	}

	return 'Сгенерировать субтитры'
}
