import { expect, type Page, test, type WebSocketRoute } from '@playwright/test'
import { pageUrls } from '../shared/utils/pageUrls'
import type {
	AiDialogueClientEvent,
	DialogueServerMessage,
} from '../widgets/aiDialogueMessages/types/aiDialogueMessage'

async function setup(page: Page, pcm = false, history: DialogueServerMessage[] = [], reconnectAfterBadGateway = false) {
	const browserErrors: string[] = []
	page.on('pageerror', (error) => browserErrors.push(error.message))
	const sent: AiDialogueClientEvent[] = []
	let checkRequests = 0
	let streamRequests = 0
	const controls: Array<{ type: string; audioFormat?: string; sampleRate?: number; numChannels?: number }> = []
	let nextSendFailure: 'http' | 'malformed' | null = null
	let sendGate: Promise<void> | null = null
	let socket: WebSocketRoute | null = null

	await page.addInitScript(
		({ usePcm, history, reconnectAfterBadGateway }) => {
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

			if (!reconnectAfterBadGateway) {
				Object.defineProperty(window, 'EventSource', { value: FakeEventSource })
			}
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
					if (audioTrack.readyState === 'ended') return
					originalStop()
					void context.close()
				}
				return destination.stream
			}
		},
		{ usePcm: pcm, history, reconnectAfterBadGateway },
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
		if (reconnectAfterBadGateway && path.endsWith('/stream')) {
			streamRequests++
			if (streamRequests === 1) return route.fulfill({ status: 502 })

			return route.fulfill({
				contentType: 'text/event-stream',
				body: history.map((message) => `data: ${JSON.stringify({ type: 'message', message })}\n\n`).join(''),
			})
		}
		if (path.endsWith('/check-message')) {
			checkRequests++
			return route.fulfill({ status: 500 })
		}
		if (path.endsWith('/messages')) {
			const event: AiDialogueClientEvent = request.postDataJSON()
			sent.push(event)
			if (sendGate) {
				await sendGate
				sendGate = null
			}
			const failure = nextSendFailure
			nextSendFailure = null
			if (failure === 'http') return route.fulfill({ status: 504, json: { message: 'Timeout' } })

			const response = {
				id: 100 + sent.findIndex(({ requestId }) => requestId === event.requestId),
				dialogueId: 1,
				createdAt: new Date().toISOString(),
			}
			if (failure === 'malformed') return route.fulfill({ json: { ...response, payload: event } })

			const payload =
				event.type === 'userActions'
					? {
							type: event.type,
							actions: event.actions.map(({ type, content }) => ({
								type,
								content: content === 'Hey girls!' ? 'Hey, girls!' : content,
							})),
							textReview: event.actions.map(({ content }) => ({
								originalText: content,
								analysis: {
									critical:
										content === 'Hey girls!'
											? [
													{
														title: 'Пропущена запятая',
														sentenceMarkdown: '**Hey girls**!',
														explanationMarkdown: 'После обращения **Hey** нужна запятая.',
													},
												]
											: [],
									suggestions: [],
								},
							})),
						}
					: { type: event.type }

			return route.fulfill({ json: { ...response, payload } })
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
		get checkRequests() {
			return checkRequests
		},
		get streamRequests() {
			return streamRequests
		},
		controls,
		failNextSend(failure: 'http' | 'malformed') {
			nextSendFailure = failure
		},
		holdNextSend() {
			let release!: () => void
			sendGate = new Promise<void>((resolve) => {
				release = resolve
			})
			return release
		},
		socket: () => socket!,
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

test('reopens a closed event stream after 502 and renders the saved NPC reply', async ({ page }) => {
	const reply: DialogueServerMessage = {
		id: 14,
		dialogueId: 1,
		createdAt: '2026-10-21T00:02:00Z',
		payload: {
			type: 'npcActions',
			npcId: 'clerk',
			npcName: 'Clara',
			npcRole: '',
			emotion: 'neutral',
			actions: [{ type: 'speech', content: 'I can help you.', translation: 'Я могу вам помочь.' }],
		},
	}
	const h = await setup(page, false, [...historyWithReviews, reply], true)
	await expect(page.getByText('Clara', { exact: true })).toBeVisible({ timeout: 4_000 })
	expect(h.streamRequests).toBeGreaterThanOrEqual(2)
})

test('opens reviews from history, marks selection and switches to the dictionary on a word click', async ({ page }) => {
	const { browserErrors } = await setup(page, false, historyWithReviews)
	const panel = page.locator('.reading-root__right-part')
	const review = panel.getByRole('region', { name: 'Сообщение' })
	const reviewed = page.getByRole('button', { name: '2 замечания' })
	await panel.getByRole('button', { name: 'Сообщение', exact: true }).click()
	await expect(review).toHaveText('Нажмите на число замечаний рядом с сообщением…')

	const row = page.locator('.ai-dialogue-user-message-row').filter({ has: reviewed })
	await row.getByText('Вы', { exact: true }).click()
	await expect(review).toHaveText('Нажмите на число замечаний рядом с сообщением…')
	await reviewed.click()
	await expect(reviewed).toHaveAttribute('aria-pressed', 'true')
	await expect(reviewed).toBeDisabled()
	await expect(reviewed).not.toBeFocused()
	await expect(review.getByRole('heading', { level: 2 })).toHaveText(['Реплика', 'Действие'])
	await expect(review.getByText('Hey girls! There is a очередь.')).toBeVisible()
	await expect(review.getByRole('heading', { name: 'Слово на русском языке' })).toBeVisible()
	await expect(review.getByText('Hey, girls! There is a line.')).toBeVisible()
	await expect(review.getByText('I looked at them.')).toBeVisible()
	await expect(review.getByRole('img', { name: 'Исправлений нет' })).toBeVisible()

	await row.getByRole('button', { name: 'girls', exact: true }).click()
	await expect(panel.getByRole('button', { name: 'Словарь' })).toBeDisabled()
	await expect(review).toBeHidden()
	await expect(reviewed).toHaveAttribute('aria-pressed', 'false')
	await expect(reviewed).toBeEnabled()

	await expect(page.locator('.ai-dialogue-user-message-row__review-button')).toHaveCount(1)
	expect(browserErrors).toEqual([])
})

test('opens the review beneath its message and disables its button on a narrow screen', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 })
	await setup(page, false, historyWithReviews)
	const reviewed = page.getByRole('button', { name: '2 замечания' })
	const review = page.getByRole('region', { name: 'Сообщение' })

	await reviewed.click()
	await expect(review).toBeVisible()
	await expect(review.getByText('Hey girls! There is a очередь.')).toBeVisible()
	await expect(page.locator('.reading-root__right-part')).toBeHidden()
	await expect(reviewed).toBeDisabled()
})

test('sends both parts directly, locks the form and opens the review from the message button', async ({ page }) => {
	const h = await setup(page)
	const { form } = h
	const send = form.getByRole('button', { name: 'Отправить', exact: true })
	const speech = form.getByRole('textbox', { name: 'Текст реплики' })
	await expect(send).toBeDisabled()
	await expect(form.getByRole('button', { name: 'Проверить', exact: true })).toHaveCount(0)
	await speech.fill('Hey girls!')
	await expect(send).toBeEnabled()
	await form.getByRole('button', { name: 'Действие', exact: true }).click()
	const action = form.getByRole('textbox', { name: 'Текст действия' })
	await expect(send).toBeEnabled()
	await action.fill('I open the door.')
	await action.press('Shift+Enter')
	await expect(action).toHaveValue('I open the door.\n')
	expect(h.sent).toHaveLength(0)

	const release = h.holdNextSend()
	try {
		await action.press('Enter')
		await expect(action).toHaveJSProperty('readOnly', true)
		await expect(form.getByRole('status')).toHaveText('Отправляю ответ…')
		await expect(send).toBeDisabled()
		await expect(form.getByRole('button', { name: 'Реплика', exact: true })).toBeDisabled()
		await expect(form.getByRole('button', { name: 'Диктовать' })).toBeDisabled()
		await action.press('Enter')
		expect(h.sent).toHaveLength(1)
	} finally {
		release()
	}

	await expect(action).toHaveValue('')
	await form.getByRole('button', { name: 'Реплика', exact: true }).click()
	await expect(speech).toHaveValue('')
	const reviewed = page.getByRole('button', { name: '1 замечание', exact: true })
	await expect(reviewed).toHaveAttribute('aria-pressed', 'false')
	await reviewed.click()
	const review = page.locator('.reading-root__right-part').getByRole('region', { name: 'Сообщение' })
	await expect(review).toContainText('Hey girls!')
	await expect(review).toContainText('Пропущена запятая')
	await expect(review).toContainText('Hey, girls!')
	await expect(review).toContainText('I open the door.')

	expect(h.sent).toEqual([
		{
			type: 'userActions',
			requestId: expect.stringMatching(/^[a-f0-9-]{36}$/),
			actions: [
				{ type: 'speech', content: 'Hey girls!' },
				{ type: 'action', content: 'I open the door.' },
			],
		},
	])
	expect(h.checkRequests).toBe(0)
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
	await expect(h.form.getByRole('button', { name: 'Отправить', exact: true })).toBeEnabled()
	const before = await input.boundingBox()
	await input.fill('First line\nSecond line\nThird line\nFourth line')
	expect((await input.boundingBox())!.height).toBeGreaterThan(before!.height)
	expect(h.browserErrors).toEqual([])
})

test('failed and malformed responses keep the draft and retry with the same ID on a narrow screen', async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 })
	const h = await setup(page)
	const input = h.form.getByRole('textbox')
	const send = h.form.getByRole('button', { name: 'Отправить', exact: true })
	const reviewed = page.getByRole('button', { name: '1 замечание', exact: true })
	await input.fill('Hey girls!')

	for (const failure of ['http', 'malformed'] as const) {
		h.failNextSend(failure)
		await send.click()
		await expect(h.form.getByRole('alert')).toBeVisible()
		await expect(input).toHaveValue('Hey girls!')
		await expect(input).toHaveJSProperty('readOnly', false)
		await expect(send).toBeEnabled()
		await expect(reviewed).toHaveCount(0)
	}

	await send.click()
	await expect(input).toHaveValue('')
	await expect(h.form.getByRole('alert')).toHaveCount(0)
	await expect(reviewed).toHaveAttribute('aria-pressed', 'false')
	await reviewed.click()
	await expect(page.getByRole('region', { name: 'Сообщение' })).toContainText('Hey girls!')
	expect(h.sent).toHaveLength(3)
	expect(new Set(h.sent.map(({ requestId }) => requestId)).size).toBe(1)
	expect(await h.form.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true)

	await h.form.getByRole('button', { name: 'Уйти от разговора' }).click()
	await expect(page.getByText('Вы ушли от разговора.')).toBeVisible()
	expect(h.sent.at(-1)).toEqual({ type: 'userAvoidsNPC', requestId: expect.any(String) })
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
	await h.form.getByRole('button', { name: 'Отправить', exact: true }).click()
	await expect(h.form.getByRole('textbox')).toHaveValue('')
	await expect(page.locator('.ai-dialogue-user-message-row')).toContainText('PCM speech')
	await expect(page.locator('.ai-dialogue-user-message-row__review-button')).toHaveCount(0)
	expect(h.sent[0]).toMatchObject({ type: 'userActions', actions: [{ type: 'speech', content: 'PCM speech' }] })
	expect(h.browserErrors).toEqual([])
})
