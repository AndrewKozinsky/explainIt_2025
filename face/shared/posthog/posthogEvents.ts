import posthog from 'posthog-js'

/** Открыто окно запуска сценария (нажатие на карточку сценария). */
type ScenarioOpenedEvent = {
	name: 'scenario_opened'
	scenario_id: number
}

/** Создан диалог по сценарию. */
type DialogueStartedEvent = {
	name: 'dialogue_started'
	dialogue_id: number
	scenario_id: number
	/** Язык, который практикует пользователь. */
	practice_language: string
	/** Максимальная сложность текста; null — без ограничений. */
	max_cefr_level: string | null
	illustration_style_id: string
	/** Написал ли пользователь пожелания к сцене. */
	has_scenario_amendment: boolean
}

/** Отправлено первое сообщение пользователя в диалоге. */
type FirstMessageSentEvent = {
	name: 'first_message_sent'
	dialogue_id: number
}

/** Пользователь воспользовался помощью в диалоге. */
type DialogueHelpUsedEvent = {
	name: 'dialogue_help_used'
	dialogue_id: number
	/**
	 * `check` — проверка черновика реплики или действия,
	 * `translation` — нажатие на слово (перевод предложения и статья словаря).
	 */
	kind: 'check' | 'translation'
}

/**
 * События продукта, которые отправляются в PostHog.
 * Название события — `name`, остальные поля — его свойства.
 * Регистрация отправляется с сервера, поэтому её здесь нет.
 */
export type PosthogEvent = ScenarioOpenedEvent | DialogueStartedEvent | FirstMessageSentEvent | DialogueHelpUsedEvent

/**
 * Отправляет событие в PostHog.
 * Если PostHog выключен (локально, на develop, на explainit.ru), событие не отправляется;
 * при локальной разработке оно выводится в консоль браузера для проверки.
 */
export function capturePosthogEvent(event: PosthogEvent) {
	const { name, ...properties } = event

	if (posthog.__loaded) {
		posthog.capture(name, properties)
		return
	}

	if (process.env.NODE_ENV === 'development') {
		console.info('[PostHog]', name, properties)
	}
}
