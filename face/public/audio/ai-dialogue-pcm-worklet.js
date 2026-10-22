/* AudioWorklet выполняется отдельно от main thread. Выдаёт моно PCM16LE и сбрасывает хвост перед stopped. */
class AiDialoguePcmProcessor extends AudioWorkletProcessor {
	constructor() {
		super()
		this.bytes = new ArrayBuffer(4096)
		this.view = new DataView(this.bytes)
		this.samples = 0
		this.active = true
		this.port.onmessage = (event) => {
			if (event.data?.type !== 'stop') return
			this.active = false
			this.flush()
			this.port.postMessage({ type: 'stopped' })
		}
	}

	process(inputs) {
		if (!this.active) return false

		const input = inputs[0]?.[0]
		if (!input) return true

		for (const sample of input) {
			const clamped = Math.max(-1, Math.min(1, sample))
			this.view.setInt16(this.samples * 2, Math.round(clamped * (clamped < 0 ? 32768 : 32767)), true)
			this.samples++

			if (this.samples === 2048) this.flush()
		}

		return true
	}

	flush() {
		if (!this.samples) return

		const bytes = this.bytes.slice(0, this.samples * 2)
		this.port.postMessage(bytes, [bytes])
		this.samples = 0
	}
}

registerProcessor('ai-dialogue-pcm', AiDialoguePcmProcessor)
