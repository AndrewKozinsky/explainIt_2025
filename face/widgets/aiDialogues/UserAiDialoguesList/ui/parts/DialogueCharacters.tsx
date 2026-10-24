import type { DialogueListCharacter } from '@/entities/aiDialogue/types/aiDialogueList'
import CharacterAvatars from '@/shared/ui/CharacterAvatars/CharacterAvatars'

type Props = { characters: DialogueListCharacter[]; size: 'small' | 'medium'; maxVisible: number }

export default function DialogueCharacters({ characters, size, maxVisible }: Props) {
	const avatars = characters.map((character) => ({
		id: character.npcId,
		name: [character.name, character.role].filter(Boolean).join(' • ') || 'Персонаж',
		imageUrl: character.emotionSheet?.url ?? null,
	}))

	return (
		<div className='ai-dialogue-card__characters'>
			<CharacterAvatars characters={avatars} size={size} maxVisible={maxVisible} />
		</div>
	)
}
