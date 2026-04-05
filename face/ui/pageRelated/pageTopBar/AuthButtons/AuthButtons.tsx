'use client'

import { pageUrls } from '@/сonsts/pageUrls'
import { MainMenuLink } from '../../MainMenuLink'
import { useGetAuthLinkType } from './fn/authLinkType'
import './AuthButtons.scss'

function AuthButtons() {
	const authLinkType = useGetAuthLinkType()

	return (
		<div className='auth-buttons'>
			{authLinkType === 'login' && <MainMenuLink linkData={pageUrls.auth.login} />}
			{authLinkType === 'account' && <MainMenuLink linkData={pageUrls.me} />}
		</div>
	)
}

export default AuthButtons
