import { LanguageCode } from 'utils/languages'

export type MediaItemsGridConfig = {
	privateItems: PrivateItem[]
	publicItems: PublicItem[]
}

export type PrivateItem = {
	name?: null | string
	subName?: null | number | string
	url: string
	actionUrl: string
	coverUrl?: string
}

export type PublicItem = {
	languageCode: LanguageCode
	name: string
	subName?: null | number | string
	backgroundColor: string
	coverUrl: string
	url: string
	actionUrl: string
	freeToUse?: boolean
}

export type AddMediaButtonConfig = {
	onClick: () => void
	loading: boolean
	errorMessage: null | string
}
