import Button from '@/ui/formRelated/buttons/Button/Button'
import { useGetOnWatchButtonClick, useIsWatchButtonDisabled } from './fn/buttonLogic'

function WatchMovieButton() {
	const isButtonDisabled = useIsWatchButtonDisabled()
	const onButtonClick = useGetOnWatchButtonClick()

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled}>
			Смотреть
		</Button>
	)
}

export default WatchMovieButton
