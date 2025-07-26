'use client'

import React from 'react'
import Button from '../../../ui/formRelated/buttons/Button/Button'
import { useGetLogout } from './fn/logout'

function LogoutButton() {
	const logout = useGetLogout()

	return <Button onClick={logout}>Выйти из учётной записи</Button>
}

export default LogoutButton
