import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/TrashButtonIcon'

type Props = { id: number; title: string; onDelete: (id: number) => void }

export default function AiDialogueDeleteButton(props: Props) {
	const { id, title, onDelete } = props
	const t = useTranslations('userAiDialogues.card')

	return (
		<Button
			size='medium'
			theme='plain'
			title={t('deleteButton')}
			icon={<TrashButtonIcon />}
			aria-label={t('deleteDialogue', { title })}
			onClick={() => onDelete(id)}
		/>
	)
}
