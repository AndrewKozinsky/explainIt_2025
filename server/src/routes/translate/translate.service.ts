import { HttpStatus, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import {
	TranslateSentenceHandler,
	TranslateSentenceStreamEvent,
} from 'features/sentenceTranslation/translateSentence/TranslateSentence.command'

@Injectable()
export class TranslateService {
	constructor(private translateSentenceHandler: TranslateSentenceHandler) {}

	async translateSentenceStream(input: {
		userId: number
		query: {
			sentenceId: number
			text: string
			isPublicMedia: boolean
			sourceLanguageCode?: null | string
			targetLanguageCode?: null | string
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		}
		request: Request
		response: Response
	}) {
		this.setUpSseHeaders(input.response)

		const abortController = new AbortController()

		input.request.on('close', () => {
			abortController.abort()
		})

		try {
			for await (const event of this.translateSentenceHandler.streamTranslate({
				...input.query,
				userId: input.userId,
				abortSignal: abortController.signal,
			})) {
				this.handleStreamEvent(input.response, event)

				if (event.type === 'done' || event.type === 'error') {
					break
				}
			}
		} catch (error) {
			this.sendEvent(input.response, 'error', {
				message: 'Unknown error',
			})

			input.response.end()
		}
	}

	private setUpSseHeaders(response: Response) {
		response.status(HttpStatus.OK)
		response.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
		response.setHeader('Cache-Control', 'no-cache, no-transform')
		response.setHeader('Connection', 'keep-alive')
		response.setHeader('X-Accel-Buffering', 'no')
		response.flushHeaders?.()
	}

	private handleStreamEvent(response: Response, event: TranslateSentenceStreamEvent) {
		if (event.type === 'chunk') {
			this.sendEvent(response, 'chunk', {
				text: event.text,
			})

			return
		}

		if (event.type === 'done') {
			this.sendEvent(response, 'done', {})
			response.end()

			return
		}

		this.sendEvent(response, 'error', {
			message: event.message,
		})
		response.end()
	}

	private sendEvent(response: Response, event: string, data: any) {
		response.write(`event: ${event}\n`)
		response.write(`data: ${JSON.stringify(data)}\n\n`)
	}
}
