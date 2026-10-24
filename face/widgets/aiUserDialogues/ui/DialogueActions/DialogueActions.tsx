import DialogueDeleteButton from '../DialogueDeleteButton/DialogueDeleteButton'
import DialogueReplyButton from '../DialogueReplyButton/DialogueReplyButton'
import './DialogueActions.scss'

type Props = {
	id: number
	title: string
	url: string
	theme: 'accent' | 'regular' | 'outline'
	onDelete: (id: number) => void
}

export default function DialogueActions({ id, title, url, theme, onDelete }: Props) {
	return (
		<div className='ai-dialogue-card__actions'>
			<DialogueDeleteButton id={id} title={title} onDelete={onDelete} />
			<DialogueReplyButton url={url} title={title} theme={theme} />
		</div>
	)
}
