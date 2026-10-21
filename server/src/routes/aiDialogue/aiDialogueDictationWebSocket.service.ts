import { IncomingMessage, Server, ServerResponse } from 'http'
import { Duplex } from 'stream'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Request, RequestHandler, Response } from 'express'
import { WebSocket, WebSocketServer } from 'ws'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { UserRepository } from 'repo/user.repository'
import { DICTATION_LIMITS } from 'features/aiDialogue/dictation/aiDialogueDictationProtocol'
import { AiDialogueDictationSession } from 'features/aiDialogue/dictation/AiDialogueDictationSession'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { SonioxSttService } from 'infrastructure/sonioxStt/sonioxStt.service'

/**
 * WebSocket /api/ai-dialogue/:id/dictation на существующем HTTP-сервере.
 * До upgrade читает ту же Redis-сессию через общий middleware и проверяет владельца
 * диалога. По одному соединению на пользователя в HTTP-процессе, включая handshake.
 * Не запускается в worker: attach вызывается только из applyAppSettings HTTP-приложения.
 */
@Injectable()
export class AiDialogueDictationWebSocket implements OnModuleDestroy {
	private wss = new WebSocketServer({
		noServer: true,
		maxPayload: DICTATION_LIMITS.frameBytes,
		perMessageDeflate: false,
	})
	private users = new Map<number, WebSocket | null>()
	private pending = new Set<Duplex>()
	private sessions = new Map<WebSocket, AiDialogueDictationSession>()
	private server?: Server
	private middleware?: RequestHandler
	private shuttingDown = false

	constructor(
		private dialogueRepository: AiDialogueRepository,
		private userRepository: UserRepository,
		private soniox: SonioxSttService,
		private mainConfig: MainConfigService,
	) {}

	/** Общий session middleware используется для чтения cookie; WebSocket не создаёт новую сессию. */
	attach(server: Server, sessionMiddleware: RequestHandler) {
		if (this.server) throw new Error('Dictation WebSocket already attached')
		this.server = server
		this.middleware = sessionMiddleware
		server.on('upgrade', this.onUpgrade)
	}

	onModuleDestroy() {
		this.shuttingDown = true
		this.server?.off('upgrade', this.onUpgrade)

		for (const socket of this.pending) socket.destroy()

		for (const [socket, session] of this.sessions) {
			session.dispose()
			socket.terminate()
		}

		this.users.clear()
		this.wss.close()
	}

	private onUpgrade = (request: IncomingMessage, socket: Duplex, head: Buffer) => {
		socket.on('error', ignoreSocketError)
		const match = /^\/api\/ai-dialogue\/([1-9]\d*)\/dictation$/.exec(request.url ?? '')

		if (!match || !Number.isSafeInteger(Number(match[1]))) {
			return rejectUpgrade(socket, 404, errorMessage.aiDialogue.notFound.code)
		}

		if (this.shuttingDown || this.pending.size >= 32) {
			return rejectUpgrade(socket, 503, errorMessage.aiDialogue.dictationLimitExceeded.code)
		}

		// До завершения авторизации не принимаем аудио и не открываем платное соединение Soniox.
		socket.pause()
		this.pending.add(socket)
		const timeout = setTimeout(() => socket.destroy(), DICTATION_LIMITS.handshakeTimeoutMs)
		const releasePending = () => {
			clearTimeout(timeout)
			this.pending.delete(socket)
		}

		socket.once('close', releasePending)

		void this.authorize(request, Number(match[1]))
			.then(({ userId, languages }) => {
				if (socket.destroyed || this.shuttingDown) return
				if (this.users.has(userId))
					return rejectUpgrade(socket, 409, errorMessage.aiDialogue.dictationAlreadyActive.code)
				this.users.set(userId, null)
				try {
					this.wss.handleUpgrade(request, socket, head, (ws) => this.connected(ws, userId, languages))
					socket.resume()
				} finally {
					if (this.users.get(userId) === null) this.users.delete(userId)
				}
			})
			.catch((error) => {
				const status = error instanceof CustomError ? error.statusCode : 500
				const code = error instanceof CustomError ? error.errorMessage.code : errorMessage.unknownError.code
				rejectUpgrade(socket, status, code)
			})
			.finally(() => {
				releasePending()
				socket.off('close', releasePending)
			})
	}

	private async authorize(request: IncomingMessage, dialogueId: number) {
		if (request.headers.origin !== new URL(this.mainConfig.get().site.domainRootWithProtocol).origin) {
			throw new CustomError(errorMessage.aiDialogue.dictationOriginForbidden, ErrorStatusCode.Forbidden_403)
		}

		await new Promise<void>((resolve, reject) => {
			const response = new ServerResponse(request)
			this.middleware!(request as Request, response as Response, (error?: unknown) =>
				error ? reject(error) : resolve(),
			)
		})

		const userId = (request as Request).session?.userId
		if (!userId || !(await this.userRepository.getUserById(userId))) {
			throw new CustomError(errorMessage.user.unauthorized, ErrorStatusCode.Unauthorized_401)
		}

		const dialogue = await this.dialogueRepository.getDialogueById(dialogueId)

		if (!dialogue) throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		if (dialogue.user_id !== userId)
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		return { userId, languages: [dialogue.source_language_code, dialogue.target_language_code] }
	}

	private connected(socket: WebSocket, userId: number, languages: string[]) {
		this.users.set(userId, socket)
		const session = new AiDialogueDictationSession(socket, this.soniox, languages)
		this.sessions.set(socket, session)
		socket.once('close', () => {
			this.sessions.delete(socket)
			if (this.users.get(userId) === socket) this.users.delete(userId)
		})
	}
}

function rejectUpgrade(socket: Duplex, status: number, code: string) {
	if (socket.destroyed) return

	const body = JSON.stringify({ code })
	socket.end(
		`HTTP/1.1 ${status} Rejected\r\nConnection: close\r\nContent-Type: application/json\r\nContent-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`,
	)
}

function ignoreSocketError() {}
