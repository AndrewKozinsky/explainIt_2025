import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'

type Processor = {
	process(inputs: Float32Array[][]): boolean
	port: { onmessage(event: { data: { type: string } }): void }
}
function processor() {
	let Constructor!: new () => Processor
	const output: Array<ArrayBuffer | { type: string }> = []
	vm.runInNewContext(readFileSync(new URL('../public/audio/ai-dialogue-pcm-worklet.js', import.meta.url), 'utf8'), {
		AudioWorkletProcessor: class {
			port = { postMessage: (data: ArrayBuffer | { type: string }) => output.push(data) }
		},
		registerProcessor(name: string, value: new () => Processor) {
			assert.equal(name, 'ai-dialogue-pcm')
			Constructor = value
		},
	})
	return { instance: new Constructor(), output }
}

test('PCM fallback clamps samples and encodes little-endian 16-bit audio, flushing before stopped', () => {
	const { instance, output } = processor()
	instance.process([[new Float32Array([-2, -1, -0.5, 0, 0.5, 1, 2])]])
	assert.equal(output.length, 0)
	instance.port.onmessage({ data: { type: 'stop' } })

	const view = new DataView(output[0] as ArrayBuffer)
	assert.deepEqual(
		Array.from({ length: 7 }, (_, index) => view.getInt16(index * 2, true)),
		[-32768, -32768, -16384, 0, 16384, 32767, 32767],
	)
	assert.equal((output[1] as { type: string }).type, 'stopped')
	assert.equal(instance.process([[new Float32Array([1])]]), false)
})

test('PCM worklet emits full buffers and preserves the final short tail', () => {
	const { instance, output } = processor()
	instance.process([[new Float32Array(2053).fill(0.25)]])
	assert.equal((output[0] as ArrayBuffer).byteLength, 4096)
	instance.port.onmessage({ data: { type: 'stop' } })
	assert.equal((output[1] as ArrayBuffer).byteLength, 10)
	assert.equal((output[2] as { type: string }).type, 'stopped')
})
