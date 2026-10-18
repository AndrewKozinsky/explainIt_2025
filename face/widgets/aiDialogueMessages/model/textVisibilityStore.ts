import { create } from 'zustand'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import type { DialogueServerMessage } from '../types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '../types/aiDialoguePreview'

type MessageVisibility = {
	initialVisible: boolean
	blocks: Record<number, boolean>
}

type PreviewEntry = { event: AiDialoguePreviewEvent; key: string }

type TextVisibilityStore = {
	showTextForNewMessages: boolean
	previewGeneration: number
	visibility: Map<string, MessageVisibility>
	previewEntries: Map<number, PreviewEntry>
	initializeDialogue: () => void
	setShowTextForNewMessages: (visible: boolean) => void
	beginPreview: () => void
	registerPreview: (events: AiDialoguePreviewEvent[]) => void
	registerMessage: (message: DialogueServerMessage) => void
	toggleBlock: (key: string, actionIndex: number) => void
}

export function messageTextVisibilityKey(messageId: number) {
	return `message:${messageId}`
}

export function previewTextVisibilityKey(generation: number, eventIndex: number) {
	return `preview:${generation}:${eventIndex}`
}

export const useDialogueTextVisibilityStore = create<TextVisibilityStore>()((set) => ({
	showTextForNewMessages: true,
	previewGeneration: 0,
	visibility: new Map(),
	previewEntries: new Map(),

	initializeDialogue: () =>
		set({
			showTextForNewMessages: localStorageManager.aiDialogueSettings.getShowText(),
			previewGeneration: 0,
			visibility: new Map(),
			previewEntries: new Map(),
		}),

	setShowTextForNewMessages: (visible) => {
		localStorageManager.aiDialogueSettings.setShowText(visible)
		set({ showTextForNewMessages: visible })
	},

	beginPreview: () =>
		set((state) => {
			const visibility = new Map(state.visibility)
			for (const { key } of state.previewEntries.values()) visibility.delete(key)
			return { visibility, previewEntries: new Map(), previewGeneration: state.previewGeneration + 1 }
		}),

	registerPreview: (events) =>
		set((state) => {
			let visibility = state.visibility
			const previewEntries = new Map(state.previewEntries)
			events.forEach((event, index) => {
				if (!hasTextVisibility(event)) return
				const eventIndex = event.audioEventIndex ?? index
				const key = previewTextVisibilityKey(state.previewGeneration, eventIndex)
				if (!visibility.has(key)) {
					if (visibility === state.visibility) visibility = new Map(visibility)
					visibility.set(key, { initialVisible: state.showTextForNewMessages, blocks: {} })
				}
				previewEntries.set(eventIndex, { event, key })
			})
			return { visibility, previewEntries }
		}),

	registerMessage: (message) =>
		set((state) => {
			const key = messageTextVisibilityKey(message.id)
			// Replay and later word-map updates must preserve both the snapshot and manual choices.
			if (!hasTextVisibility(message.payload) || state.visibility.has(key)) return state

			const visibility = new Map(state.visibility)
			const previewEntries = new Map(state.previewEntries)
			const signature = eventSignature(message.payload)
			const match = [...previewEntries].find(([, entry]) => eventSignature(entry.event) === signature)
			let value: MessageVisibility = { initialVisible: state.showTextForNewMessages, blocks: {} }

			if (match) {
				const [index, entry] = match
				const previous = visibility.get(entry.key)
				if (previous) value = finalizeVisibility(previous, entry.event)
				previewEntries.delete(index)
				visibility.delete(entry.key)
			}
			visibility.set(key, value)

			return { visibility, previewEntries }
		}),

	toggleBlock: (key, actionIndex) =>
		set((state) => {
			const current = state.visibility.get(key)
			if (!current) return state
			const visible = current.blocks[actionIndex] ?? current.initialVisible
			const visibility = new Map(state.visibility)
			visibility.set(key, { ...current, blocks: { ...current.blocks, [actionIndex]: !visible } })
			return { visibility }
		}),
}))

function hasTextVisibility(event: AiDialoguePreviewEvent) {
	return event.type === 'sceneUpdate' || event.type === 'npcActions'
}

// Final messages have no preview ID. Match only within the current turn, in arrival order.
// Ignore translation, emotion normalization, and word maps, which may be updated independently.
function eventSignature(event: AiDialoguePreviewEvent) {
	if (event.type === 'npcActions') {
		const actions = event.actions?.filter((action) => action.content).map(({ type, content }) => [type, content])
		return JSON.stringify([event.type, event.npcId, actions])
	}
	return JSON.stringify([event.type, event.content])
}

function finalizeVisibility(value: MessageVisibility, preview: AiDialoguePreviewEvent): MessageVisibility {
	if (preview.type !== 'npcActions') return value
	// The server drops empty actions, so their preview indices must not shift manual choices.
	const blocks: Record<number, boolean> = {}
	let finalIndex = 0

	preview.actions?.forEach((action, index) => {
		if (!action.content) return
		if (value.blocks[index] !== undefined) blocks[finalIndex] = value.blocks[index]
		finalIndex += 1
	})

	return { ...value, blocks }
}
