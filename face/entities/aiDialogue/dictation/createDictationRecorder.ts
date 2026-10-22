export type DictationRecorder = Pick<
	MediaRecorder,
	'state' | 'ondataavailable' | 'onstop' | 'onerror' | 'start' | 'stop'
> & {
	audioOptions?: { audioFormat: 'pcm_s16le'; sampleRate: number; numChannels: 1 }
	dispose?(): void
}

/** WebM/Ogg для MediaRecorder; браузеры без этих контейнеров используют моно PCM через AudioWorklet. */
export async function createDictationRecorder(stream: MediaStream, signal: AbortSignal): Promise<DictationRecorder> {
	if (typeof MediaRecorder !== 'undefined') {
		const mimeType = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus'].find((type) =>
			MediaRecorder.isTypeSupported(type),
		)
		if (mimeType) return new MediaRecorder(stream, { mimeType })
	}

	if (typeof AudioContext === 'undefined' || typeof AudioWorkletNode === 'undefined') throw new Error('unsupported')
	const context = new AudioContext({ sampleRate: 48_000 })
	const release = () => {
		void context.close().catch(() => undefined)
	}

	signal.addEventListener('abort', release, { once: true })

	try {
		if (signal.aborted) throw new DOMException('Cancelled', 'AbortError')
		if (context.sampleRate < 8000 || context.sampleRate > 48000) throw new Error('unsupported')
		await context.audioWorklet.addModule('/audio/ai-dialogue-pcm-worklet.js')
		await context.resume()
		if (signal.aborted) throw new DOMException('Cancelled', 'AbortError')
		return new PcmDictationRecorder(context, stream)
	} catch (error) {
		release()
		throw error
	} finally {
		signal.removeEventListener('abort', release)
	}
}

class PcmDictationRecorder implements DictationRecorder {
	state: RecordingState = 'inactive'
	ondataavailable: MediaRecorder['ondataavailable'] = null
	onstop: MediaRecorder['onstop'] = null
	onerror: MediaRecorder['onerror'] = null
	readonly audioOptions: NonNullable<DictationRecorder['audioOptions']>
	private source: MediaStreamAudioSourceNode
	private worklet: AudioWorkletNode
	private disposed = false
	private stopped = false

	constructor(
		private context: AudioContext,
		stream: MediaStream,
	) {
		this.audioOptions = { audioFormat: 'pcm_s16le', sampleRate: context.sampleRate, numChannels: 1 }
		this.source = context.createMediaStreamSource(stream)
		this.worklet = new AudioWorkletNode(context, 'ai-dialogue-pcm', {
			channelCount: 1,
			channelCountMode: 'explicit',
		})
		this.worklet.port.onmessage = (event) => this.receive(event.data)
		this.worklet.onprocessorerror = () => {
			this.onerror?.call(this as unknown as MediaRecorder, new ErrorEvent('error'))
		}
	}

	start() {
		if (this.disposed || this.stopped || this.state !== 'inactive') throw new Error('Recorder already started')
		this.state = 'recording'
		this.source.connect(this.worklet)
		// Выход процессора нулевой: граф обрабатывается без проигрывания голоса в динамиках.
		this.worklet.connect(this.context.destination)
	}

	stop() {
		if (this.disposed || this.state !== 'recording') return
		this.state = 'inactive'
		this.stopped = true
		this.worklet.port.postMessage({ type: 'stop' })
	}

	dispose() {
		if (this.disposed) return
		this.disposed = true
		this.state = 'inactive'
		this.source.disconnect()
		this.worklet.disconnect()
		this.worklet.port.onmessage = null
		this.worklet.port.close()
		void this.context.close().catch(() => undefined)
	}

	private receive(data: unknown) {
		if (this.disposed) return
		if (data instanceof ArrayBuffer) {
			this.ondataavailable?.call(
				this as unknown as MediaRecorder,
				new BlobEvent('dataavailable', { data: new Blob([data]) }),
			)
		} else if (data && typeof data === 'object' && 'type' in data && data.type === 'stopped') {
			this.dispose()
			this.onstop?.call(this as unknown as MediaRecorder, new Event('stop'))
		}
	}
}
