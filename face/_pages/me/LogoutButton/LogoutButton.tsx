'use client'

import React from 'react'
import Button from '../../../ui/formRelated/buttons/Button/Button'
import { publicFolderFilesUrls } from '../../../utils/publicFolderFilesUrls'
import { useGetLogout } from './fn/logout'

function LogoutButton() {
	const logout = useGetLogout()

	return (
		<Button onClick={logout} icon={<img src={.icons.githubButtonIcon} alt='icon' />}>
			Выйти из учётной записи
		</Button>
	)
}

export default LogoutButton
