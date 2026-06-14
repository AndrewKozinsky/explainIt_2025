import BaseButton from 'ui/BaseButton/BaseButton'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { BigPlusIcon } from 'ui/icons/BigPlusIcon'
import Spinner from 'ui/Spinner/Spinner'
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
