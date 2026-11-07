import { parseAiDialogueEvents } from './parseAiDialogueEvents'

describe('parseAiDialogueEvents', () => {
	it('extracts NPC appearance, normalized emotion and actions', () => {
		const result = parseAiDialogueEvents(
			[
				'npcActions|stranger_1|Alex|passer-by|WORRIED',
				'appearance:',
				'adult with short dark hair and a green raincoat',
				'speech:',
				'Are you lost?',
				'Вы заблудились?',
			].join('\n'),
		)

		expect(result.events).toEqual([
			{
				type: 'npcActions',
				npcId: 'stranger_1',
				npcName: 'Alex',
				npcRole: 'passer-by',
				emotion: 'worried',
				actions: [{ type: 'speech', content: 'Are you lost?', translation: 'Вы заблудились?' }],
			},
		])
		expect(result.visualMetadata.npcAppearances).toEqual([
			{ npcId: 'stranger_1', appearance: 'adult with short dark hair and a green raincoat' },
		])
	})

	it('extracts a single-line appearance written before actions', () => {
		const result = parseAiDialogueEvents(
			[
				'npcActions|clerk|Giulia|clerk|happy',
				'appearance: woman with curly chestnut hair',
				'voice: {"voice":"coral","instructions":"Warm friendly voice"}',
				'speech:',
				'Ciao!',
				'Привет!',
			].join('\n'),
		)

		expect(result.visualMetadata.npcAppearances).toEqual([
			{ npcId: 'clerk', appearance: 'woman with curly chestnut hair' },
		])

		expect(result.events[0]).toMatchObject({
			actions: [{ type: 'speech', content: 'Ciao!', translation: 'Привет!' }],
		})
	})

	it('extracts the NPC voice profile written before actions', () => {
		const result = parseAiDialogueEvents(
			[
				'npcActions|clerk|Giulia|clerk|happy',
				'voice:',
				'{"voice":"coral","instructions":"Warm friendly voice"}',
				'speech:',
				'Ciao!',
				'Привет!',
			].join('\n'),
		)

		expect(result.npcVoices).toEqual([
			{ npcId: 'clerk', voice: { voice: 'coral', instructions: 'Warm friendly voice' } },
		])
	})

	it('ignores an invalid voice profile and a voice label inside the speech', () => {
		const result = parseAiDialogueEvents(
			[
				'npcActions|clerk|Giulia|clerk|happy',
				'voice: {"voice":"unknown","instructions":"Warm"}',
				'speech:',
				'Ciao!',
				'Привет!',
				'',
				'npcActions|guide|Marco|guide|neutral',
				'speech:',
				'voice: {"voice":"coral","instructions":"Warm"}',
				'Голос.',
			].join('\n'),
		)

		expect(result.npcVoices).toEqual([])
	})

	it('extracts scene participants and visual description', () => {
		const result = parseAiDialogueEvents(
			[
				'sceneUpdate',
				'You enter a small dental office.',
				'Вы входите в небольшой стоматологический кабинет.',
				'participants:dentist_1, assistant_1',
				'visual:The learner stands by the door while the dentist turns to greet them.',
			].join('\n'),
		)

		expect(result.events[0]).toEqual({
			type: 'sceneUpdate',
			content: 'You enter a small dental office.',
			translation: 'Вы входите в небольшой стоматологический кабинет.',
		})

		expect(result.visualMetadata.scenes).toEqual([
			{
				eventIndex: 0,
				participantNpcIds: ['dentist_1', 'assistant_1'],
				visualDescription: 'The learner stands by the door while the dentist turns to greet them.',
			},
		])
	})

	it('normalizes unknown NPC emotions', () => {
		const result = parseAiDialogueEvents(
			['npcActions|dentist_1|Dr. Lee|dentist|friendly', 'speech:', 'Hello!', 'Здравствуйте!'].join('\n'),
		)

		expect(result.events[0]).toMatchObject({ type: 'npcActions', emotion: 'neutral' })
	})

	it('does not create scene metadata for other text events', () => {
		const result = parseAiDialogueEvents('worldEvent\nA bell rings.\nЗвенит звонок.')
		expect(result.events).toHaveLength(1)
		expect(result.visualMetadata.scenes).toEqual([])
	})

	it('returns an empty turn for an empty response', () => {
		expect(parseAiDialogueEvents('')).toEqual({
			events: [],
			visualMetadata: { npcAppearances: [], scenes: [] },
			npcVoices: [],
		})
	})
})
