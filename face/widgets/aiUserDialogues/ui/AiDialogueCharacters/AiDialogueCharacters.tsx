import { useTranslations } from 'next-intl'
import type { DialogueListCharacter } from '@/entities/aiDialogue/types/aiDialogueList'
import CharacterAvatars from '@/shared/ui/CharacterAvatars/CharacterAvatars'

type Props = { characters: DialogueListCharacter[]; size: 'small' | 'medium'; maxVisible: number }

export default function AiDialogueCharacters({ characters, size, maxVisible }: Props) {
	const t = useTranslations('userAiDialogues.card')

	const avatars = characters.map((character) => ({
		id: character.npcId,
		name: [character.name, character.role].filter(Boolean).join(' • ') || t('characterFallback'),
		imageUrl: character.emotionSheet?.url ?? null,
	}))

	return <CharacterAvatars characters={avatars} size={size} maxVisible={maxVisible} />
}
