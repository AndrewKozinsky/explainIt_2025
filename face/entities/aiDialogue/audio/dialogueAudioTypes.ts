/** Позиция озвучиваемого текста в сохранённом сообщении. */
export type DialogueAudioAddress = { messageId: number; actionIndex: number }

/** Готовый файл озвучки, полученный с сервера. */
export type DialogueAudioFile = { url: string; mimeType: string }

/** actionIndex описания сцены: у сцены нет списка actions. */
export const SCENE_AUDIO_ACTION_INDEX = -1

export function getDialogueAudioKey(address: DialogueAudioAddress) {
	return `${address.messageId}:${address.actionIndex}`
}

/** Адрес озвучки сохранённого сообщения. У превью нет messageId — озвучивать ещё нечего. */
export function getAudioAddress(messageId: number | undefined, actionIndex: number): DialogueAudioAddress | undefined {
	return messageId === undefined ? undefined : { messageId, actionIndex }
}
