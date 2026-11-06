import React from 'react'
import { useTranslations } from 'next-intl'
import Paragraph from '@/shared/ui/Paragraph/Paragraph'
import Button from '../formRelated/buttons/Button/Button'
import { useGetOnButtonClick } from './fn/onButtonClick'
import './OAuthButtons.scss'

function OAuthButtons() {
	const t = useTranslations('auth.oauth')
	const onGitHubClick = useGetOnButtonClick('github')
	const onGoogleClick = useGetOnButtonClick('google')
	const onYandexClick = useGetOnButtonClick('yandex')

	return (
		<div className='oauth'>
			<p>{t('title')}</p>
			<div className='oauth__buttons'>
				<Button onClick={onGitHubClick}>GitHub</Button>
				<Button onClick={onGoogleClick}>Google</Button>
				<Button onClick={onYandexClick}>Yandex</Button>
			</div>
			<Paragraph fontSize={14}>{t('welcomeBonus')}</Paragraph>
		</div>
	)
}

export default OAuthButtons
