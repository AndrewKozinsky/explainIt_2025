import BaseButton from '@/shared/ui/BaseButton/BaseButton'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { BigPlusIcon } from '@/shared/ui/icons/BigPlusIcon'
import Spinner from '@/shared/ui/Spinner/Spinner'
import { useGetOnAddMediaButtonClick } from './fn/onAddMediaButtonClick'
import './MediaGridAddButton.scss'

type MediaGridAddButtonProps = {
	onClick: () => void
	loading: boolean
	errorMessage: null | string
}

export function MediaGridAddButton(props: MediaGridAddButtonProps) {
	const { onClick, loading, errorMessage } = props

	const onClickWithGuard = useGetOnAddMediaButtonClick(onClick)

	let content = <BigPlusIcon />
	if (loading) content = <Spinner size='small' />
	if (errorMessage) content = <ErrorMessage text={errorMessage} />

	return (
		<BaseButton
			theme='outline'
			extraClass='media-items-grid-add-button'
			onClick={onClickWithGuard}
			disabled={loading || !!errorMessage}
		>
			{content}
		</BaseButton>
	)
}
