import { DialogueAudioLineParser } from './DialogueAudioLineParser'

const header =
	'npcActions|officer|Alex|officer|neutral\nvoice:\n{"voice":"ash","instructions":"Low calm official voice"}\n'
describe('early dialogue audio line parser', () => {
	it('emits a completed speech before its translation or word map exists', () => {
		const parser = new DialogueAudioLineParser()
		expect(parser.push(header + 'speech:\nYour pass')).toEqual([])
		expect(parser.push('port, please.\n')).toEqual([
			{
				eventIndex: 0,
				actionIndex: 0,
				npcId: 'officer',
				text: 'Your passport, please.',
				voice: { voice: 'ash', instructions: 'Low calm official voice' },
			},
		])
		expect(parser.push('Ваш паспорт.\n\nwordMaps:\n{"content":"speech:"}\n')).toEqual([])
	})

	it('keeps positions of actions while emitting separate speeches and scenes', () => {
		const parser = new DialogueAudioLineParser()
		const raw =
			'sceneUpdate\nYou enter.\nВы входите.\nparticipants:officer\nvisual:Office\n\n' +
			header +
			'action:\nlooks at you\nсмотрит на вас\nspeech:\nHello.\nЗдравствуйте.\nspeech:\nWait here.\nПодождите.'
		const candidates = [...parser.push(raw), ...parser.finish()]
		expect(candidates.map((item) => [item.eventIndex, item.actionIndex, item.text])).toEqual([
			[0, -1, 'You enter.'],
			[1, 1, 'Hello.'],
			[1, 2, 'Wait here.'],
		])
	})
	it('produces the same candidates for every possible chunk boundary and CRLF', () => {
		const raw = (header + 'speech:\nHello.\nЗдравствуйте.\n\nhelp\nDo something.\nСделайте.\n').replace(
			/\n/g,
			'\r\n',
		)
		const baseline = new DialogueAudioLineParser().push(raw)
		for (let split = 0; split <= raw.length; split += 1) {
			const parser = new DialogueAudioLineParser()
			expect([...parser.push(raw.slice(0, split)), ...parser.push(raw.slice(split))]).toEqual(baseline)
		}
	})
	it('does not speak actions, translations, help, world events or user actions', () => {
		const parser = new DialogueAudioLineParser()
		expect(
			parser.push(
				'help\nHelp.\nПомощь.\n\nworldEvent\nNoise.\nШум.\n\nuserActions\nspeech:\nHello.\n\n' +
					header +
					'action:\nsmiles\nулыбается\n',
			),
		).toEqual([])
	})
	it('accepts literal speech labels as content without duplicate emission', () => {
		const parser = new DialogueAudioLineParser()
		expect(parser.push(header + 'speech:\nspeech:\ntranslation\n').map((item) => item.text)).toEqual(['speech:'])
	})
	it('rejects an invalid voice profile and does not treat it as spoken text', () => {
		const parser = new DialogueAudioLineParser()
		expect(
			parser.push(
				'npcActions|officer|||neutral\nvoice:\n{"voice":"invalid","instructions":"calm"}\nspeech:\nHello.\n',
			)[0].voice,
		).toBeNull()
	})
})
