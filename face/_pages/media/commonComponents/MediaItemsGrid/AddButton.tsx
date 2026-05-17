import BaseButton from 'ui/BaseButton/BaseButton'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { BigPlusIcon } from 'ui/icons/BigPlusIcon/BigPlusIcon'
import Spinner from 'ui/Spinner/Spinner'
import { useGetOnAddMediaButtonClick } from './fn/onAddMediaButtonClick'

type AddButtonProps = {
	onClick: () => void
	loading: boolean
	errorMessage: null | string
}

export function AddButton(props: AddButtonProps) {
	const { onClick, loading, errorMessage } = props

	const onClickWithGuard = useGetOnAddMediaButtonClick(onClick)

	let content = <BigPlusIcon />
	if (loading) content = <Spinner size='small' />
	if (errorMessage) content = <ErrorMessage text={errorMessage} />

	return (
		<BaseButton
			extraClass='media-items-grid__add-button'
			onClick={onClickWithGuard}
			disabled={loading || !!errorMessage}
		>
			{content}
		</BaseButton>
	)
}
