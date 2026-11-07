import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import './AiDialoguesLoadError.scss'

type AiDialoguesLoadErrorProps = {
	onRetry: () => void
}

/** Ошибка начальной загрузки списка диалогов с кнопкой повтора. */
export default function AiDialoguesLoadError({ onRetry }: AiDialoguesLoadErrorProps) {
	const t = useTranslations('userAiDialogues')

	return (
		<div role='alert' className='ai-dialogues-load-error'>
			<StatusBlock type='error'>{t('loadError')}</StatusBlock>
			<Button onClick={onRetry}>{t('retry')}</Button>
		</div>
	)
}
