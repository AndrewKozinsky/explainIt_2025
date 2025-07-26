'use client'

import React from 'react'
import { pageUrls } from '../../../../сonsts/pageUrls'
import { MainMenuLink } from '../../MainMenuLink'
import { useGetAuthLinkType } from './fn/authLinkType'

function PageTopBarUserButtons() {
	const authLinkType = useGetAuthLinkType()

	return (
		<div>
			{authLinkType === 'login' && <MainMenuLink linkData={pageUrls.auth.login} />}
			{authLinkType === 'account' && <MainMenuLink linkData={pageUrls.me} />}
		</div>
	)
}

export default PageTopBarUserButtons
