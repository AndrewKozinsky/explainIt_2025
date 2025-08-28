import React from 'react'
import Header from '../../../ui/ArtHeader/Header'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'

/** Страница контактов */
function ContactsPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Контакты</Header>
				<p>
					По всем вопросам обращайтесь в Телеграм{' '}
					<a href='https://t.me/AndrewKozinsky' className='link'>
						@AndrewKozinsky
					</a>{' '}
					или пишите на почту{' '}
					<a href='mailto:andkozinskiy@yandex.ru' className='link'>
						andkozinskiy@yandex.ru
					</a>
					.
				</p>
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default ContactsPage
