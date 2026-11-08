import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogMessageRouter from '@/widgets/aiDialogueMessages/ui/AiDialogMessageRouter/AiDialogMessageRouter'
import PendingAnswerMessage from '../messages/PendingAnswerMessage/PendingAnswerMessage'
import { DialogueVisualsProvider } from '../visuals/DialogueVisualsContext'
import './AiDialogueMessageList.scss'

// TEMP: тестовые сообщения help/worldEvent — удалить после проверки.
function buildTempWordMap(content: string, phraseWords: string[]) {
	const words = Array.from(content.matchAll(/[A-Za-z']+/g), (match, id) => ({
		id,
		text: match[0],
		start: match.index ?? 0,
		end: (match.index ?? 0) + match[0].length,
	}))
	const wordIds = words.filter((word) => phraseWords.includes(word.text)).map((word) => word.id)
	const selections = wordIds.map((wordId) => ({ wordId, wordIds, phrase: phraseWords.join(' ') }))
	return { status: 'ready' as const, blocks: { content: { content, words, selections } } }
}

const tempHelpWithMap = 'Pick up the phone to answer the call.'
const tempWorldWithMap = 'The lights go out and the music stops.'

const tempEvents: AiDialoguePreviewEvent[] = [
	{
		type: 'help',
		content: 'Someone is knocking. You can open the door.',
		translation: 'Кто-то стучит. Вы можете открыть дверь.',
	},
	{
		type: 'help',
		content: tempHelpWithMap,
		translation: 'Возьмите трубку, чтобы ответить на звонок.',
		wordMap: buildTempWordMap(tempHelpWithMap, ['Pick', 'up']),
	},
	{ type: 'worldEvent', content: 'A dog barks somewhere outside.', translation: 'Где-то снаружи лает собака.' },
	{
		type: 'worldEvent',
		content: tempWorldWithMap,
		translation: 'Гаснет свет, и музыка замолкает.',
		wordMap: buildTempWordMap(tempWorldWithMap, ['go', 'out']),
	},
]

type AiDialogueMessageListProps = {
	messages: DialogueServerMessage[]
	preview: AiDialoguePreviewEvent[]
	isGenerating: boolean
	onWordSelect: AiDialogueWordSelectHandler
	visuals?: AiDialogueVisualsModel
	refreshVisuals: () => void
	recoverImage: (assetKey: string) => void
}

/**
 * Список сообщений диалога: сохранённые сообщения + частичные события текущего
 * хода (превью). Пока генерация идёт и превью пусто — показывает плейсхолдер.
 */
function AiDialogueMessageList({
	messages,
	preview,
	isGenerating,
	onWordSelect,
	visuals,
	refreshVisuals,
	recoverImage,
}: AiDialogueMessageListProps) {
	const savedMessages = messages.map((message) => (
		<AiDialogMessageRouter
			key={message.id}
			messageId={message.id}
			event={message.payload}
			reserveSceneSpace={message.payload.type === 'sceneUpdate' && Boolean(message.payload.visualDescription)}
			onWordSelect={onWordSelect}
		/>
	))

	const previewMessages = preview.map((event, index) => (
		<AiDialogMessageRouter
			key={`preview-${index}`}
			event={event}
			previewEventIndex={index}
			reserveSceneSpace
			onWordSelect={onWordSelect}
		/>
	))

	return (
		<DialogueVisualsProvider visuals={visuals} refreshVisuals={refreshVisuals} recoverImage={recoverImage}>
			<div className='ai-dialogue-message-list'>
				{tempEvents.map((event, index) => (
					<AiDialogMessageRouter key={`temp-${index}`} event={event} onWordSelect={onWordSelect} />
				))}
				{savedMessages}

				{isGenerating && preview.length === 0 && <PendingAnswerMessage />}
				{previewMessages}
			</div>
		</DialogueVisualsProvider>
	)
}

export default AiDialogueMessageList
