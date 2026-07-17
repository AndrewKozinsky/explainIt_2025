'use client'

import { MediaGridAddButton } from '_pages/media/commonComponents/mediaItemsGrid/MediaGridAddButton/MediaGridAddButton'
import { useAddVideo } from './fn/useAddVideo'

/**
 * Клиентская обёртка над MediaGridAddButton.
 * Связывает кнопку с VideosApi.createVideo() через useAsyncMutation,
 * обрабатывает ошибки уведомлениями.
 */
export function AddVideoButtonWrapper() {
	const { handleClick, loading, error } = useAddVideo()

	return <MediaGridAddButton onClick={handleClick} loading={loading} errorMessage={error} />
}
