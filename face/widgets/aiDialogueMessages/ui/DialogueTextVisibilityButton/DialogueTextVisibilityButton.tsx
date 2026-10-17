import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { EyeClosedSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/EyeClosedSmallButtonIcon'
import { EyeOpenedSmallButtonIcon } from '@/shared/ui/icons/buttonIcons/small/EyeOpenedSmallButtonIcon'

type DialogueTextVisibilityButtonProps = {
	isTextVisible: boolean
	colorScheme?: 'dark' | 'light'
	onClick: () => void
}

export default function DialogueTextVisibilityButton({
	isTextVisible,
	onClick,
	colorScheme = 'dark',
}: DialogueTextVisibilityButtonProps) {
	return (
		<Button
			size='small'
			theme='outline'
			colorScheme={colorScheme}
			rounded
			onClick={onClick}
			aria-pressed={isTextVisible}
			icon={isTextVisible ? <EyeClosedSmallButtonIcon /> : <EyeOpenedSmallButtonIcon />}
		>
			{isTextVisible ? 'Скрыть текст' : 'Показать текст'}
		</Button>
	)
}
