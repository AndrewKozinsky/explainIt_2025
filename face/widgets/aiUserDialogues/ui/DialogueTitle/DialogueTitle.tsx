import './DialogueTitle.scss'

export default function DialogueTitle({ title }: { title: string }) {
	return <h4 className='ai-dialogue-card__title'>{title}</h4>
}
