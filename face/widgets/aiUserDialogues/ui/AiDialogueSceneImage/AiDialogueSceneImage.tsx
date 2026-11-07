import { useTranslations } from 'next-intl'
import './AiDialogueSceneImage.scss'

export default function AiDialogueSceneImage({ url, title }: { url?: string; title: string }) {
	const t = useTranslations('userAiDialogues.card')

	if (!url) return null

	return <img className='ai-dialogue-scene-image' src={url} alt={t('sceneImageAlt', { title })} loading='lazy' />
}
