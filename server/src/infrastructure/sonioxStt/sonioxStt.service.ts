import { Injectable } from '@nestjs/common'
import { WebSocket } from 'ws'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { SonioxSttOptions, sonioxSttOptionsSchema, SonioxSttSession } from './sonioxStt.types'
import { SonioxSttError } from './SonioxSttError'
import { SonioxSttStream } from './SonioxSttStream'

@Injectable()
export class SonioxSttService {
	constructor(private readonly mainConfig: MainConfigService) {}

	async openStream(options: SonioxSttOptions = {}): Promise<SonioxSttSession> {
		const parsed = sonioxSttOptionsSchema.safeParse(options)

		if (!parsed.success) throw new SonioxSttError('invalid_input', 'Invalid Soniox STT options')
		if (parsed.data.abortSignal?.aborted) throw new SonioxSttError('aborted', 'Soniox STT session aborted')

		let apiKey: string | null
		try {
			apiKey = this.mainConfig.get().soniox.apiKey
		} catch {
			throw new SonioxSttError('configuration', 'Invalid Soniox STT configuration')
		}

		if (!apiKey) throw new SonioxSttError('configuration', 'Soniox API key is required')

		let socket: WebSocket

		try {
			socket = new WebSocket('wss://stt-rt.soniox.com/transcribe-websocket', {
				headers: { Authorization: `Bearer ${apiKey}` },
				handshakeTimeout: parsed.data.connectTimeoutMs,
				maxPayload: 1024 * 1024,
				perMessageDeflate: false,
			})
		} catch {
			throw new SonioxSttError('connection_failed', 'Cannot connect to Soniox STT')
		}

		const session = new SonioxSttStream(socket, parsed.data)
		await session.ready

		return session
	}
}
