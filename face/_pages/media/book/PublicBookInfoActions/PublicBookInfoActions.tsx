import { useRouter } from '@/i18n/routing'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/ActionButtonIcon'

type PublicBookInfoActionsProps = {
	bookUrl: string
}

function PublicBookInfoActions(props: PublicBookInfoActionsProps) {
	const { bookUrl } = props

	const router = useRouter()
	const actionLabel = 'Читать'

	function handleActionClick() {
		router.push(bookUrl)
	}

	return (
		<div className='public-book-info__actions'>
			<Button onClick={handleActionClick} icon={<ActionButtonIcon />}>
				{actionLabel}
			</Button>
		</div>
	)
}

export default PublicBookInfoActions
