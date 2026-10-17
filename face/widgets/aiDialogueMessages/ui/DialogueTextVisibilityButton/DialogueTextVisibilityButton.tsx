import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { EyeClosedSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/EyeClosedSmallButtonIcon'
import { EyeOpenedSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/EyeOpenedSmallButtonIcon'

type DialogueTextVisibilityButtonProps = {
	isTextVisible: boolean
	onClick: () => void
}

export default function DialogueTextVisibilityButton({ isTextVisible, onClick }: DialogueTextVisibilityButtonProps) {
	return (
		<Button
			size='small'
			theme='outline'
			rounded
			onClick={onClick}
			aria-pressed={isTextVisible}
			icon={isTextVisible ? <EyeClosedSmallButtonIcon /> : <EyeOpenedSmallButtonIcon />}
		>
			{isTextVisible ? 'Скрыть текст' : 'Показать текст'}
		</Button>
	)
}
