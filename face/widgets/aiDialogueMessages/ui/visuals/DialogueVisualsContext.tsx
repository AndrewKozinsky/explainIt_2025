import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo } from 'react'
import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { useUser } from '@/shared/api/auth/UserProvider'
import type { AiDialogueCharacterVisualOutModel, AiDialogueSceneVisualOutModel } from '@/shared/api/generated/models'

type DialogueVisualsValue = {
	userAvatarUrl?: string
	characters: Map<string, AiDialogueCharacterVisualOutModel>
	scenes: Map<number, AiDialogueSceneVisualOutModel>
	recoverImage: (assetKey: string) => void
	refreshVisuals: () => void
}

const DialogueVisualsContext = createContext<DialogueVisualsValue>({
	characters: new Map(),
	scenes: new Map(),
	recoverImage: function () {},
	refreshVisuals: function () {},
})

type Props = {
	visuals?: AiDialogueVisualsModel
	recoverImage: (assetKey: string) => void
	refreshVisuals: () => void
	children: ReactNode
}

export function DialogueVisualsProvider({ visuals, recoverImage, refreshVisuals, children }: Props) {
	const user = useUser()
	// Profile changes refresh the avatar in every open dialogue without changing saved scenes.
	useEffect(
		function () {
			if (user?.avatarUrl) refreshVisuals()
		},
		[user?.avatarUrl, refreshVisuals],
	)

	const value = useMemo(
		function () {
			return {
				userAvatarUrl: visuals?.userAvatarUrl,
				characters: new Map(visuals?.characters.map((character) => [character.npcId, character])),
				scenes: new Map(visuals?.scenes.map((scene) => [scene.messageId, scene])),
				recoverImage,
				refreshVisuals,
			}
		},
		[visuals, recoverImage, refreshVisuals],
	)

	return <DialogueVisualsContext.Provider value={value}>{children}</DialogueVisualsContext.Provider>
}

export function useDialogueVisuals() {
	return useContext(DialogueVisualsContext)
}
