'use client'

import React from 'react'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import Button from '../../../ui/formRelated/buttons/Button/Button'
import { useGetLogout } from './fn/logout'

function LogoutButton() {
	const logout = useGetLogout()

	return (
		<Button onClick={logout} icon={<img src={publicFolderFilesUrls.icons.githubButtonIcon} alt='icon' />}>
			Выйти из учётной записи
		</Button>
	)
}

export default LogoutButton
