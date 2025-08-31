import React from 'react'
import Header from 'ui/Header/Header'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
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
