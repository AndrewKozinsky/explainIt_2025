// 'use client'

// import { useState } from 'react'
// import BaseButton from '@/shared/ui/BaseButton/BaseButton'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import { BigPlusIcon } from '@/shared/ui/icons/BigPlusIcon'
// import Spinner from '@/shared/ui/Spinner/Spinner'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import './MediaGridAddButton.scss'

/*type MediaGridAddButtonProps = {
	addAction: () => Promise<ApiResult<unknown>>
}*/

/**
 * Кнопка добавления элемента в медиа-грид.
 *
 * Принимает асинхронный экшен `addAction`, сама управляет состоянием
 * загрузки и ошибок. Показывает:
 * - {@link BigPlusIcon} — в обычном состоянии
 * - {@link Spinner} — во время выполнения `addAction`
 * - {@link ErrorMessage} — если `addAction` вернул ошибку
 */
/*export function MediaGridAddButton(props: MediaGridAddButtonProps) {
	const { addAction } = props

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const handleClick = async function () {
		setLoading(true)
		setErrorMessage(null)

		const result = await addAction()

		setLoading(false)
		if (result.error) {
			setErrorMessage(result.error)
		}
	}

	let content = <BigPlusIcon />

	if (loading) content = <Spinner size='small' />
	if (errorMessage) content = <ErrorMessage text={errorMessage} />

	return (
		<BaseButton
			theme='outline'
			extraClass='media-items-grid-add-button'
			onClick={handleClick}
			disabled={loading || !!errorMessage}
		>
			{content}
		</BaseButton>
	)
}*/
