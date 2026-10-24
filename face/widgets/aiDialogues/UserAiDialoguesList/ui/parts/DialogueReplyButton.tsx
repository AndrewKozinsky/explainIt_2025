import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionButtonIcon'

type Props = { url: string; title: string; theme: 'accent' | 'regular' }

export default function DialogueReplyButton({ url, title, theme }: Props) {
	return (
		<Button
			href={url}
			size='custom'
			theme={theme}
			extraClass='ai-dialogue-card__reply'
			aria-label={`Ответить в диалоге «${title}»`}
		>
			<ActionButtonIcon /> Ответить
		</Button>
	)
}
