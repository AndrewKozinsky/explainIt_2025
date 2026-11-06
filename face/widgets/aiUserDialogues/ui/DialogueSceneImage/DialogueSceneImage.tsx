import { useTranslations } from 'next-intl'
import './DialogueSceneImage.scss'

export default function DialogueSceneImage({ url, title }: { url?: string; title: string }) {
	const t = useTranslations('userAiDialogues.card')

	if (!url) return null

	return <img className='ai-dialogue-card__scene' src={url} alt={t('sceneImageAlt', { title })} loading='lazy' />
}
