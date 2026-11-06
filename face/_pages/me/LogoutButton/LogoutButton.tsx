'use client'

import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { useGetLogout } from './fn/logout'

function LogoutButton() {
	const t = useTranslations('mePage')
	const logout = useGetLogout()

	return <Button onClick={logout}>{t('logout')}</Button>
}

export default LogoutButton
