import Button from '@/ui/formRelated/buttons/Button/Button'
import { useGetOnWatchButtonClick, useIsWatchButtonDisabled } from './fn/buttonLogic'

interface Props {
	disabled?: boolean
}

function WatchMovieButton({ disabled = false }: Props) {
	const isButtonDisabled = useIsWatchButtonDisabled()
	const onButtonClick = useGetOnWatchButtonClick()

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled || disabled}>
			Смотреть
		</Button>
	)
}

export default WatchMovieButton
