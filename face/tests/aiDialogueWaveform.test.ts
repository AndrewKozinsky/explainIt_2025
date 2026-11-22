import assert from 'node:assert/strict'
import { afterEach, mock, test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { AiDialogueDictationWaveform } from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/AiDialogueDictationWaveform'
import { observeDictationWaveform } from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/fn/observeDictationWaveform'

const originals = new Map<string, PropertyDescriptor | undefined>()
function replace(name: string, value: unknown) {
	originals.set(name, Object.getOwnPropertyDescriptor(globalThis, name))
	Object.defineProperty(globalThis, name, { value, configurable: true, writable: true })
}
afterEach(() => {
	for (const [name, descriptor] of originals) {
		if (descriptor) Object.defineProperty(globalThis, name, descriptor)
		else Reflect.deleteProperty(globalThis, name)
	}
	originals.clear()
})

function harness() {
	let nextFrame!: FrameRequestCallback
	let signal = 0
	const source = { connect: mock.fn(), disconnect: mock.fn() }
	const analyser = {
		fftSize: 0,
		getFloatTimeDomainData: (samples: Float32Array) => samples.fill(signal),
	}
	const context = {
		state: 'running',
		createAnalyser: () => analyser,
		createMediaStreamSource: mock.fn(() => source),
		resume: mock.fn(async () => undefined),
		close: mock.fn(async () => undefined),
	}
	replace(
		'AudioContext',
		class {
			constructor() {
				return context
			}
		},
	)
	replace('requestAnimationFrame', (callback: FrameRequestCallback) => {
		nextFrame = callback
		return 1
	})
	replace('cancelAnimationFrame', mock.fn())
	return {
		context,
		source,
		tick: (time: number, level = 0) => {
			signal = level
			nextFrame(time)
		},
	}
}

test('recording indicator renders visible SVG bars before microphone analysis starts', () => {
	const markup = renderToStaticMarkup(createElement(AiDialogueDictationWaveform))
	assert.match(markup, /ai-dialogue-input__waveform/)
	assert.equal((markup.match(/<path /g) ?? []).length, 1)
	assert.doesNotMatch(markup, /canvas/)
})

test('microphone waveform distinguishes silence and quiet speech and releases only its own resources', () => {
	const h = harness()
	const stop = mock.fn()
	const stream = { getTracks: () => [{ stop }] } as unknown as MediaStream
	const frames: number[] = []
	const dispose = observeDictationWaveform(stream, (levels) => frames.push(levels))
	h.tick(0)
	assert.equal(frames.length, 0)
	h.tick(50)
	assert.equal(frames[0], 0)
	h.tick(100, 0.01)
	assert.ok(frames[1] > 0.2)
	h.tick(150, 1)
	assert.equal(frames[2], 1)
	assert.equal(frames[0], 0)
	dispose()
	h.tick(200, 1)
	assert.equal(frames.length, 3)
	assert.equal(h.source.disconnect.mock.callCount(), 1)
	assert.equal(h.context.close.mock.callCount(), 1)
	assert.equal(stop.mock.callCount(), 0)
})

test('a suspended analyser adds only new silence samples at the recording cadence', () => {
	const h = harness()
	h.context.state = 'suspended'
	const levels: number[] = []
	const dispose = observeDictationWaveform({} as MediaStream, (level) => levels.push(level))
	h.tick(0)
	assert.equal(levels.length, 0)
	h.tick(50)
	assert.deepEqual(levels, [0])
	h.context.state = 'running'
	h.tick(100, 0.05)
	assert.ok(levels[1] > 0)
	dispose()
})

test('recording without Web Audio fills progressively with silence instead of a prefilled wave', () => {
	const h = harness()
	replace(
		'AudioContext',
		class {
			constructor() {
				throw new Error('Unavailable')
			}
		},
	)
	const levels: number[] = []
	const dispose = observeDictationWaveform({} as MediaStream, (level) => levels.push(level))
	h.tick(0)
	assert.deepEqual(levels, [])
	h.tick(50)
	assert.deepEqual(levels, [0])
	h.tick(100)
	assert.deepEqual(levels, [0, 0])
	dispose()
})
