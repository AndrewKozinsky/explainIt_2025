import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { useGetOnWatchButtonClick, useIsWatchButtonDisabled } from './fn/buttonLogic'

type WatchVideoButtonProps = {
	videoId: number
	hasContent?: boolean
	hasFile?: boolean
}

function WatchVideoButton(props: WatchVideoButtonProps) {
	const { videoId, hasContent, hasFile } = props

	const isButtonDisabled = useIsWatchButtonDisabled(hasContent, hasFile)
	const onButtonClick = useGetOnWatchButtonClick(videoId)

	return (
		<Button onClick={onButtonClick} disabled={isButtonDisabled}>
			Смотреть
		</Button>
	)
}

export default WatchVideoButton
