import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'

/** Страница контактов */
function ContactsPage() {
	return (
		<PageWrapper withTop withBottom>
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
