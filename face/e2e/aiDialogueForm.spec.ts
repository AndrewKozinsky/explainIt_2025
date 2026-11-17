import { expect, type Page, test, type WebSocketRoute } from '@playwright/test'
import { pageUrls } from '../shared/utils/pageUrls'
import type {
	AiDialogueClientEvent,
	DialogueServerMessage,
} from '../widgets/aiDialogueMessages/types/aiDialogueMessage'

async function setup(page: Page, pcm = false, history: DialogueServerMessage[] = []) {
	const browserErrors: string[] = []
	page.on('pageerror', (error) => browserErrors.push(error.message))
	const sent: unknown[] = []
	const checks: unknown[] = []
	const controls: Array<{ type: string; audioFormat?: string; sampleRate?: number; numChannels?: number }> = []
	let failCheck = false
	let socket: WebSocketRoute | null = null

	await page.addInitScript(
		({ usePcm, history }) => {
			class FakeEventSource {
				onopen: (() => void) | null = null
				onmessage: ((event: MessageEvent<string>) => void) | null = null
				onerror = null
				constructor() {
					setTimeout(() => {
						this.onopen?.()
						for (const message of history) {
							this.onmessage?.(
								new MessageEvent('message', { data: JSON.stringify({ type: 'message', message }) }),
							)
						}
					}, 0)
				}
				close() {}
			}

			Object.defineProperty(window, 'EventSource', { value: FakeEventSource })
			const track = new EventTarget() as EventTarget & { stop(): void }
			track.stop = () => undefined
			Object.defineProperty(navigator, 'mediaDevices', {
				configurable: true,
				value: {
					getUserMedia: async () => {
						if (!usePcm) return { getTracks: () => [track], getAudioTracks: () => [track] }
						return silentAudioStream()
					},
				},
			})
			class FakeRecorder {
				state = 'inactive'
				ondataavailable: ((event: { data: Blob }) => void) | null = null
				onstop: (() => void) | null = null
				onerror = null

				static isTypeSupported(type: string) {
					return !usePcm && type.includes('webm')
				}

				start() {
					this.state = 'recording'
					this.ondataavailable?.({ data: new Blob(['header']) })
				}
				stop() {
					this.state = 'inactive'
					queueMicrotask(() => {
						this.ondataavailable?.({ data: new Blob(['tail']) })
						this.onstop?.()
					})
				}
			}
			Object.defineProperty(window, 'MediaRecorder', { value: FakeRecorder })
			function silentAudioStream() {
				const context = new AudioContext()
				const oscillator = context.createOscillator()
				const volume = context.createGain()
				const destination = context.createMediaStreamDestination()
				volume.gain.value = 0
				oscillator.connect(volume)
				volume.connect(destination)
				oscillator.start()
				void context.resume()
				const audioTrack = destination.stream.getAudioTracks()[0]
				const originalStop = audioTrack.stop.bind(audioTrack)
				audioTrack.stop = () => {
					originalStop()
					void context.close()
				}
				return destination.stream
			}
		},
		{ usePcm: pcm, history },
	)
	await page.routeWebSocket('**/api/ai-dialogue/*/dictation', (ws) => {
		socket = ws
		ws.onMessage((message) => {
			if (typeof message !== 'string') return
			const control = JSON.parse(message)
			controls.push(control)
			if (control.type === 'start') ws.send(JSON.stringify({ type: 'ready' }))
		})
	})
	await page.route('**/api/**', async (route) => {
		const request = route.request()
		const path = new URL(request.url()).pathname
		if (path.endsWith('/check-message')) {
			const input = request.postDataJSON()
			checks.push(input)
			await new Promise((resolve) => setTimeout(resolve, 300))
			if (failCheck) {
				failCheck = false
				return route.fulfill({ status: 500, json: { message: 'Error' } })
			}
			return route.fulfill({ json: { speech: result(input.speech), action: result(input.action) } })
		}
		if (path.endsWith('/messages')) {
			const event: AiDialogueClientEvent = request.postDataJSON()
			sent.push(event)
			const payload =
				event.type === 'userActions'
					? {
							...event,
							textReview: event.actions.map(({ content }) => ({
								originalText: content,
								analysis: { critical: [], suggestions: [] },
							})),
						}
					: event
			return route.fulfill({
				json: { id: 100 + sent.length, dialogueId: 1, createdAt: new Date().toISOString(), payload },
			})
		}
		if (path.endsWith('/visuals'))
			return route.fulfill({
				json: {
					dialogueId: 1,
					characters: [],
					scenes: [],
					userAvatarUrl: '',
				},
			})
		if (path.endsWith('/audio')) return route.fulfill({ json: { dialogueId: 1, attempts: [], items: [] } })
		if (/\/ai-dialogue\/\d+$/.test(path))
			return route.fulfill({
				json: {
					id: 1,
					sourceLanguageCode: 'en',
					targetLanguageCode: 'ru',
					maxCefrLevel: null,
					scenario: {
						id: 1,
						slug: 'test',
						title: history.length ? 'В очереди' : 'Проверка формы',
						description: '',
					},
					createdAt: '2026-10-21T00:00:00Z',
					updatedAt: '2026-10-21T00:00:00Z',
				},
			})
		return route.fulfill({ json: [] })
	})
	await page.goto(`/ru${pageUrls.aiDialogues.dialog(1).path}`)
	const form = page.getByRole('region', { name: 'Ответ в диалоге' })
	await expect(form).toBeVisible()
	return {
		form,
		browserErrors,
		sent,
		checks,
		controls,
		failNextCheck() {
			failCheck = true
		},
		socket: () => socket!,
	}
}

function result(text?: string) {
	const issue = {
		title: 'Неверный предлог',
		sentenceMarkdown: 'Stay **in** the end.',
		explanationMarkdown: 'Используйте **at the end** — «в конце».',
	}
	return {
		critical: text?.includes('bad') ? [issue] : [],
		suggestions: text ? [{ explanationMarkdown: 'Запятая после **Hey**:', example: 'Hey, girls!' }] : [],
	}
}

const historyWithReviews: DialogueServerMessage[] = [
	{
		id: 12,
		dialogueId: 1,
		createdAt: '2026-10-21T00:00:00Z',
		payload: {
			type: 'userActions',
			actions: [
				{ type: 'action', content: 'I looked at them.' },
				{ type: 'speech', content: 'Hey, girls! There is a line.' },
			],
			textReview: [
				{ originalText: 'I looked at them.', analysis: { critical: [], suggestions: [] } },
				{
					originalText: 'Hey girls! There is a очередь.',
					analysis: {
						critical: [
							{
								title: 'Слово на русском языке',
								sentenceMarkdown: 'There is a **очередь**.',
								explanationMarkdown: '«Очередь» по-английски — **line**.',
							},
						],
						suggestions: [
							{
								explanationMarkdown: 'При обращении можно выбрать более спокойный тон.',
								example: 'Excuse me, there is a line.',
							},
						],
					},
				},
			],
		},
	},
	{
		id: 13,
		dialogueId: 1,
		createdAt: '2026-10-21T00:01:00Z',
		payload: {
			type: 'userActions',
			actions: [{ type: 'speech', content: 'Thank you!' }],
			textReview: [{ originalText: 'Thank you!', analysis: { critical: [], suggestions: [] } }],
		},
	},
]

test('opens reviews from history, marks selection and switches to the dictionary on a word click', async ({ page }) => {
	const { browserErrors } = await setup(page, false, historyWithReviews)
	const panel = page.locator('.reading-root__right-part')
	const review = panel.getByRole('region', { name: 'Сообщение' })
	const reviewed = page.getByRole('button', { name: 'Посмотреть разбор сообщения с замечаниями' })
	await panel.getByRole('button', { name: 'Сообщение', exact: true }).click()
	await expect(review).toHaveText('Выделите сообщение для просмотра ошибок…')

	const row = page.locator('.ai-dialogue-user-message-row').filter({ has: reviewed })
	await row.getByText('Вы', { exact: true }).click()
	await expect(reviewed).toHaveAttribute('aria-pressed', 'true')
	const selectedRow = page.locator('.ai-dialogue-user-message-row__message--selected')
	await expect(selectedRow).toHaveCount(1)
	await expect(review.getByRole('heading', { level: 2 })).toHaveText(['Реплика', 'Действие'])
	await expect(review.getByText('Hey girls! There is a очередь.')).toBeVisible()
	await expect(review.getByRole('heading', { name: 'Слово на русском языке' })).toBeVisible()
	await expect(review.getByText('Hey, girls! There is a line.')).toBeVisible()
	await expect(review.getByText('I looked at them.')).toBeVisible()
	await expect(review.getByText('Исправлений нет')).toBeVisible()

	await selectedRow.getByRole('button', { name: 'girls', exact: true }).click()
	await expect(panel.getByRole('button', { name: 'Словарь' })).toBeDisabled()
	await expect(review).toBeHidden()
	await expect(selectedRow).toHaveCount(1)

	await page.getByRole('button', { name: 'Посмотреть разбор сообщения', exact: true }).click()
	await expect(review.getByText('Thank you!')).toBeVisible()
	await expect(review.getByText('Исправленный текст')).toHaveCount(0)
	await page.getByRole('button', { name: 'Посмотреть разбор сообщения', exact: true }).click()
	await expect(review).toHaveText('Выделите сообщение для просмотра ошибок…')
	await expect(selectedRow).toHaveCount(0)
	expect(browserErrors).toEqual([])
})

test('opens and closes the review beneath its message on a narrow screen', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 })
	await setup(page, false, historyWithReviews)
	const reviewed = page.getByRole('button', { name: 'Посмотреть разбор сообщения с замечаниями' })
	const review = page.getByRole('region', { name: 'Сообщение' })

	await reviewed.click()
	await expect(review).toBeVisible()
	await expect(review.getByText('Hey girls! There is a очередь.')).toBeVisible()
	await expect(page.locator('.reading-root__right-part')).toBeHidden()
	await reviewed.click()
	await expect(review).toHaveCount(0)
})

test('form checks each tab, blocks sending for errors in the other tab, invalidates edits and sends once', async ({
	page,
}) => {
	const h = await setup(page)
	const form = h.form
	const speech = form.getByRole('textbox', { name: 'Текст реплики' })
	await expect(speech).toHaveAttribute('placeholder', 'Hi, how’s it going?')
	await expect(form.getByRole('button', { name: 'Проверить', exact: true })).toBeDisabled()
	await speech.fill('Hey girls!')
	await form.getByRole('button', { name: 'Проверить', exact: true }).click()
	await expect(speech).toHaveJSProperty('readOnly', true)
	await expect(form.getByRole('status')).toHaveText('Идёт проверка текста…')
	await expect(form.getByRole('button', { name: 'Отправить', exact: true })).toBeEnabled()
	await form.getByRole('button', { name: 'Действие', exact: true }).click()
	const action = form.getByRole('textbox', { name: 'Текст действия' })
	await expect(action).toHaveAttribute('placeholder', 'I opened the door')
	await action.fill('bad action')
	await form.getByRole('button', { name: 'Проверить', exact: true }).click()
	await expect(form.getByRole('heading', { name: 'Неверный предлог' })).toBeVisible()
	await expect(form.getByRole('status')).toHaveText('Исправьте 1 ошибку, чтобы отправить ответ')
	await form.screenshot({ path: '/private/tmp/explainit-form-critical.png' })
	await form.getByRole('button', { name: 'Реплика', exact: true }).click()
	await expect(speech).toHaveValue('Hey girls!')
	await expect(form.getByRole('button', { name: 'Отправить', exact: true })).toBeDisabled()
	await expect(form.getByRole('status')).toHaveText('Текст действия содержит ошибки.')
	await form.getByRole('button', { name: 'Действие', exact: true }).click()
	await action.fill('I opened the door')
	await form.getByRole('button', { name: 'Проверить', exact: true }).click()
	await expect(form.getByRole('button', { name: 'Отправить', exact: true })).toBeEnabled()
	await action.fill('I opened the door.')
	await expect(form.getByRole('button', { name: 'Проверить', exact: true })).toBeEnabled()
	await action.press('Enter')
	await expect(form.getByRole('button', { name: 'Отправить', exact: true })).toBeEnabled()
	await form.getByRole('button', { name: 'Отправить', exact: true }).click()
	await expect(action).toHaveValue('')
	expect(h.sent).toEqual([
		{
			type: 'userActions',
			actions: [
				{ type: 'speech', content: 'Hey girls!' },
				{ type: 'action', content: 'I opened the door.' },
			],
		},
	])
	expect(h.checks[0]).toEqual({ speech: 'Hey girls!' })
	expect(h.browserErrors).toEqual([])
})

test('dictation preserves focus and replaces selected text through partial/final/done; editor grows', async ({
	page,
}) => {
	const h = await setup(page)
	const input = h.form.getByRole('textbox')
	await input.fill('Before OLD after.')
	await input.evaluate((node: HTMLTextAreaElement) => {
		node.focus()
		node.setSelectionRange(7, 10)
	})
	await h.form.getByRole('button', { name: 'Диктовать', exact: true }).click()
	await expect(h.form.getByRole('status')).toHaveText('Слушаю…')
	await expect(input).toBeFocused()
	h.socket().send(JSON.stringify({ type: 'partial', text: 'Hello очер' }))
	await expect(input).toHaveValue('Before Hello очер after.')
	expect(
		await input.evaluate((node: HTMLTextAreaElement) => node.value.slice(node.selectionStart, node.selectionEnd)),
	).toBe('Hello очер')
	const stopButton = h.form.getByRole('button', { name: 'Завершить', exact: true })
	await stopButton.focus()
	h.socket().send(JSON.stringify({ type: 'partial', text: 'Hello очередь' }))
	await expect(input).toHaveValue('Before Hello очередь after.')
	await expect(stopButton).toBeFocused()
	h.socket().send(JSON.stringify({ type: 'final', text: 'Hello очередь.' }))
	await h.form.getByRole('button', { name: 'Завершить', exact: true }).click()
	await expect(h.form.getByRole('status')).toHaveText('Завершаю распознавание…')
	await expect(input).toHaveJSProperty('readOnly', true)
	await expect(h.form.getByRole('button', { name: 'Распознавание' })).toBeDisabled()
	h.socket().send(JSON.stringify({ type: 'done', text: 'Hello очередь.' }))
	await expect(input).toHaveValue('Before Hello очередь. after.')
	await expect(input).toHaveJSProperty('readOnly', false)
	await expect(h.form.getByRole('button', { name: 'Проверить', exact: true })).toBeEnabled()
	const before = await input.boundingBox()
	await input.fill('First line\nSecond line\nThird line\nFourth line')
	expect((await input.boundingBox())!.height).toBeGreaterThan(before!.height)
	expect(h.browserErrors).toEqual([])
})

test('failure and retry keep the draft; mobile form fits the viewport', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 })
	const h = await setup(page)
	const input = h.form.getByRole('textbox')
	await input.fill('Hey girls!')
	h.failNextCheck()
	await h.form.getByRole('button', { name: 'Проверить', exact: true }).click()
	await expect(h.form.getByRole('alert')).toHaveText('Не удалось проверить текст.')
	await expect(input).toHaveValue('Hey girls!')
	await h.form.getByRole('button', { name: 'Проверить', exact: true }).click()
	await expect(h.form.getByRole('button', { name: 'Отправить', exact: true })).toBeEnabled()
	await h.form.screenshot({ path: '/private/tmp/explainit-form-mobile.png' })
	expect(await h.form.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true)
	await h.form.getByRole('button', { name: 'Уйти от разговора' }).click()
	expect(h.sent[0]).toEqual({ type: 'userAvoidsNPC' })
	expect(h.browserErrors).toEqual([])
})

test('PCM fallback records with the real AudioWorklet when WebM/Ogg are unavailable', async ({ page }) => {
	const h = await setup(page, true)
	await h.form.getByRole('button', { name: 'Диктовать', exact: true }).click()
	await expect(h.form.getByRole('status')).toHaveText('Слушаю…')
	expect(h.controls[0]).toMatchObject({ type: 'start', audioFormat: 'pcm_s16le', numChannels: 1 })
	expect(h.controls[0].sampleRate).toBeGreaterThanOrEqual(8000)
	await h.form.getByRole('button', { name: 'Завершить', exact: true }).click()
	await expect.poll(() => h.controls.at(-1)?.type).toBe('stop')
	h.socket().send(JSON.stringify({ type: 'final', text: 'PCM speech' }))
	h.socket().send(JSON.stringify({ type: 'done', text: 'PCM speech' }))
	await expect(h.form.getByRole('textbox')).toHaveValue('PCM speech')
	expect(h.browserErrors).toEqual([])
})
