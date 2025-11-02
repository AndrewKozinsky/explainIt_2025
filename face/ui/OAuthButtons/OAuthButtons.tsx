import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import Button from '../formRelated/buttons/Button/Button'
import { useGetOnButtonClick } from './fn/onButtonClick'
import './OAuthButtons.scss'

function OAuthButtons() {
	// const onGitHubClick = useGetOnButtonClick('github')
	// const onGoogleClick = useGetOnButtonClick('google')
	const onYandexClick = useGetOnButtonClick('yandex')

	return (
		<div className='oauth'>
			<p>Быстрый вход через социальную сеть:</p>
			<div className='oauth__buttons'>
				{/*<Button onClick={onGitHubClick}>GitHub</Button>*/}
				{/*<Button onClick={onGoogleClick}>Google</Button>*/}
				<Button onClick={onYandexClick}>Yandex</Button>
			</div>
			<Paragraph fontSize={14}>При регистрации получаете приветственный бонус на баланс</Paragraph>
		</div>
	)
}

export default OAuthButtons
