import { LanguageCode } from '@/shared/utils/languages'

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
	coverUrl: string
	url: string
	actionUrl: string
}
