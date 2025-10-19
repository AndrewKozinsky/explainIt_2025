import React from 'react'
import Button from '../formRelated/buttons/Button/Button'
import { useGetOnButtonClick } from './fn/onButtonClick'
import './OAuthButtons.scss'

function OAuthButtons() {
	// const onGitHubClick = useGetOnButtonClick('github')
	// const onGoogleClick = useGetOnButtonClick('google')
	const onYandexClick = useGetOnButtonClick('yandex')

	return (
		<div className='oauth'>
			{/*<Button onClick={onGitHubClick}>GitHub</Button>*/}
			{/*<Button onClick={onGoogleClick}>Google</Button>*/}
			<Button onClick={onYandexClick}>Yandex</Button>
		</div>
	)
}

export default OAuthButtons
