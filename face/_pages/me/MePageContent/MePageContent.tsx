import React from 'react'
import LogoutButton from '../LogoutButton/LogoutButton'
import UserProfileForm from '../UserProfileForm/UserProfileForm'
import './MePageContent.scss'

function MePageContent() {
	return (
		<main className='me-page-content'>
			{/* Do not forget to use STATE MACHINE FOR COMPONENTS !!! https://zagjs.com/ */}
			<UserProfileForm />
			<LogoutButton />
		</main>
	)
}

export default MePageContent
