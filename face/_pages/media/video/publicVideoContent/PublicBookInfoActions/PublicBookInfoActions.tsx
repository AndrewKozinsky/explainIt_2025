import { useRouter } from '@/i18n/routing'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/ui/icons/buttonIcons/ActionButtonIcon'

type PublicBookInfoActionsProps = {
	videoUrl: string
}

function PublicBookInfoActions(props: PublicBookInfoActionsProps) {
	const { videoUrl } = props

	const router = useRouter()
	const actionLabel = 'Смотреть'

	function handleActionClick() {
		router.push(videoUrl)
	}

	return (
		<div className='public-video-info__actions'>
			<Button onClick={handleActionClick} icon={<ActionButtonIcon />}>
				{actionLabel}
			</Button>
		</div>
	)
}

export default PublicBookInfoActions
