export type RecognitionRef = { current: any }

export function getSpeechRecognitionCtor(): any {
	// No feature detection/guard by requirement; assume available
	return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
}

export function startRecognition(
	recognitionRef: RecognitionRef,
	setState: (s: 'idle' | 'recording' | 'thinking') => void,
	onInsert: (text: string) => void,
	lang: string,
) {
	const Ctor = getSpeechRecognitionCtor()
	const rec = new Ctor()
	rec.lang = lang || 'ru'
	rec.interimResults = false
	rec.maxAlternatives = 1

	rec.onstart = () => setState('recording')
	rec.onresult = (e: any) => {
		const text = Array.from(e.results)
			.map((r: any) => r?.[0]?.transcript)
			.filter(Boolean)
			.join(' ')
		if (text) onInsert(text)
	}
	rec.onerror = () => setState('idle')
	rec.onend = () => setState('idle')

	rec.start()
	recognitionRef.current = rec
}

export function stopRecognition(
	recognitionRef: RecognitionRef,
	setState: (s: 'idle' | 'recording' | 'thinking') => void,
) {
	const rec = recognitionRef.current
	if (!rec) return
	setState('thinking')
	try {
		rec.stop()
	} catch {
		setState('idle')
	}
}
