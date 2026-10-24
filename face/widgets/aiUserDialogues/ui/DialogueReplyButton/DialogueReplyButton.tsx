import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionButtonIcon'

type Props = { url: string; title: string; theme: 'accent' | 'regular' | 'outline' }

export default function DialogueReplyButton({ url, title, theme }: Props) {
	return (
		<Button href={url} theme={theme} aria-label={`Ответить в диалоге «${title}»`} icon={<ActionButtonIcon />}>
			Продолжить
		</Button>
	)
}
