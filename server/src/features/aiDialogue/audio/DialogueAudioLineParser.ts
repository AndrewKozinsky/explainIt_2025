import { readNpcMetadataField } from '../readNpcMetadataField'
import { DialogueVoice, dialogueVoiceSchema } from './aiDialogueAudioConfig'

export type DialogueAudioCandidate = {
	eventIndex: number
	actionIndex: number
	npcId: string | null
	text: string
	voice: DialogueVoice | null
	/** Block lines received so far, for diagnostics when an NPC speech arrives without a voice profile. */
	block: string
}

/** Consumes complete protocol lines only. Text/translation/footer are never confused by chunk boundaries. */
export class DialogueAudioLineParser {
	private pending = ''
	private block: string[] = []
	private eventIndex = -1
	private footer = false
	private voices: { npcId: string; profile: DialogueVoice }[] = []

	push(chunk: string): DialogueAudioCandidate[] {
		if (this.footer) return []
		this.pending += chunk
		const result: DialogueAudioCandidate[] = []
		let newline = this.pending.indexOf('\n')

		while (newline >= 0) {
			const line = this.pending.slice(0, newline).replace(/\r$/, '')
			this.pending = this.pending.slice(newline + 1)
			const candidate = this.consume(line)
			if (candidate) result.push(candidate)
			if (this.footer) {
				this.pending = ''
				break
			}
			newline = this.pending.indexOf('\n')
		}

		return result
	}

	takeVoices() {
		const result = this.voices
		this.voices = []
		return result
	}

	finish(): DialogueAudioCandidate[] {
		return this.pending && !this.footer ? this.push('\n') : []
	}

	private consume(line: string): DialogueAudioCandidate | null {
		if (!line.trim()) {
			this.block = []
			return null
		}

		if (!this.block.length) {
			if (line.trim() === 'wordMaps:') {
				this.footer = true
				return null
			}
			this.eventIndex += 1
		}

		this.block.push(line)
		const type = this.block[0].trim().split('|')[0]

		if (type === 'sceneUpdate' && this.block.length === 2)
			return { eventIndex: this.eventIndex, actionIndex: -1, npcId: null, text: line, voice: null, block: '' }
		if (type !== 'npcActions') return null

		// Walk triples instead of matching the preceding label: literal "speech:" is valid spoken text.
		let actionIndex = 0
		let voice: DialogueVoice | null = null

		for (let i = 1; i < this.block.length;) {
			const field = readNpcMetadataField(this.block, i)
			if (field) {
				if (field.name === 'voice') {
					voice = parseVoice(field.value)
					const npcId = this.block[0].split('|')[1]?.trim()
					if (voice && npcId && field.valueIndex === this.block.length - 1)
						this.voices.push({ npcId, profile: voice })
				}
				i = field.next
				continue
			}

			const label = this.block[i].trim()
			if (label !== 'action:' && label !== 'speech:') return null

			if (label === 'speech:' && i + 1 === this.block.length - 1) {
				const npcId = this.block[0].split('|')[1]?.trim()
				if (!npcId) return null
				return {
					eventIndex: this.eventIndex,
					actionIndex,
					npcId,
					text: line,
					voice,
					block: this.block.join('\n'),
				}
			}

			actionIndex += 1
			i += 3
		}
		return null
	}
}

function parseVoice(line?: string): DialogueVoice | null {
	try {
		const parsed = dialogueVoiceSchema.safeParse(JSON.parse(line ?? ''))
		return parsed.success ? parsed.data : null
	} catch {
		return null
	}
}
