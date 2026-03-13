export type MediaItemsGridConfig = {
	privateItems: PrivateItem[]
	publicItems: PublicItem[]
}

export type PrivateItem = {
	name?: null | string
	subName?: null | number | string
	url: string
}

export type PublicItem = {
	languageCode: string
	name: string
	subName?: null | number | string
	backgroundColor: string
	coverUrl: string
	url: string
}

export type AddMediaButtonConfig = {
	onClick: () => void
	loading: boolean
	errorMessage: null | string
}
