import './DialogueSceneImage.scss'

export default function DialogueSceneImage({ url, title }: { url?: string; title: string }) {
	if (!url) return null

	return <img className='ai-dialogue-card__scene' src={url} alt={`Сцена диалога «${title}»`} loading='lazy' />
}
