import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
import { languageKeys } from '@/utils/languages'

export const routing = defineRouting({
	locales: [...languageKeys],
	defaultLocale: 'en',
	localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter, getPathname, permanentRedirect } = createNavigation(routing)
