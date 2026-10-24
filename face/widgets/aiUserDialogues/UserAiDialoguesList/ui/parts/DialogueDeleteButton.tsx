import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/TrashButtonIcon'

type Props = { id: number; title: string; onDelete: (id: number) => void }

export default function DialogueDeleteButton(props: Props) {
	const { id, title, onDelete } = props

	return (
		<Button
			size='medium'
			theme='plain'
			title='Удалить диалог'
			icon={<TrashButtonIcon />}
			aria-label={`Удалить диалог «${title}»`}
			onClick={() => onDelete(id)}
		/>
	)
}
