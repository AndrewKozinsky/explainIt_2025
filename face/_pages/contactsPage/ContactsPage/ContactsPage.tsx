import React from 'react'
import { BreadCrumbs } from '../../../ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '../../../ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageHeader } from '../../../ui/pageRelated/PageHeader/PageHeader'
import { PageWrapper } from '../../../ui/pageRelated/PageWrapper/PageWrapper'

/** Страница контактов */
function ContactsPage() {
	return (
		<PageWrapper>
			<PageContentWrapper>
				<BreadCrumbs />
				<PageHeader>Контакты</PageHeader>
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
