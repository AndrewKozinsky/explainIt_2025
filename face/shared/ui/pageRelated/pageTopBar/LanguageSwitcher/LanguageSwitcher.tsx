'use client'

import { useLocale } from 'next-intl'
import { languageKeys, languages } from 'utils/languages'
import { useRouter, usePathname } from '@/i18n/routing'
import Select from '@/shared/ui/formRelated/Select/Select'

export function LanguageSwitcher() {
	const router = useRouter()
	const pathname = usePathname()
	const locale = useLocale()

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const newLocale = event.target.value
		if (newLocale === locale) return

		// next-intl сам обновит cookie NEXT_LOCALE и добавит локаль в URL
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<Select
			selectProps={{
				value: locale,
				onChange: handleChange,
				'aria-label': 'Choose language',
			}}
			options={languageKeys.map((code) => ({
				value: code,
				label: languages[code].name,
			}))}
		/>
	)
}
