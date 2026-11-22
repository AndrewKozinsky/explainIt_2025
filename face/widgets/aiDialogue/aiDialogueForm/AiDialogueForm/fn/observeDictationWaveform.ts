/** Samples the existing microphone; missing audio produces only new silence bars. */
export function observeDictationWaveform(
	stream: MediaStream | undefined,
	onLevel: (level: number) => void,
): () => void {
	let context: AudioContext | undefined
	let source: MediaStreamAudioSourceNode | undefined
	let analyser: AnalyserNode | undefined
	const samples = new Float32Array(2048)
	let frame = 0
	let disposed = false
	let lastSample: number | undefined

	try {
		if (stream) {
			context = new AudioContext()
			analyser = context.createAnalyser()
			analyser.fftSize = samples.length
			source = context.createMediaStreamSource(stream)
			source.connect(analyser)
			void context.resume().catch(() => undefined)
		}
	} catch {
		// Keep showing recording progress if Web Audio is unavailable.
	}

	function sample(time: number) {
		if (disposed) return
		lastSample ??= time

		if (time - lastSample >= 50) {
			lastSample = time
			let level = 0

			if (context?.state === 'running' && analyser) {
				analyser.getFloatTimeDomainData(samples)
				const energy = Math.sqrt(samples.reduce((sum, value) => sum + value ** 2, 0) / samples.length)
				level = Math.min(1, Math.sqrt(energy) * 2.5)
			}
			onLevel(level)
		}

		frame = requestAnimationFrame(sample)
	}

	frame = requestAnimationFrame(sample)

	return () => {
		disposed = true
		cancelAnimationFrame(frame)
		source?.disconnect()
		if (context) void context.close().catch(() => undefined)
	}
}
