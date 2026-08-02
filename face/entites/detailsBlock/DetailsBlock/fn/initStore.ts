import { useEffect } from 'react'
import { useDetailsStore } from '../../detailsStore'

type ApplySelectionInput = {
	bookName?: null | string
	bookAuthor?: null | string
	videoName?: null | string
	languageCode?: null | string
}

export function useInitStore(input: ApplySelectionInput) {
	const store = useDetailsStore.getState()

	useEffect(
		function () {
			store.updateStore({
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				languageCode: input.languageCode,
			})
		},
		[input.bookName, input.videoName],
	)
}
