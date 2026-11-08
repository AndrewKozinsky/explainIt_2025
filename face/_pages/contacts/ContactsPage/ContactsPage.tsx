import { useTranslations } from 'next-intl'
import mainConfig from '@/shared/consts/mainConfig'
import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import { pageUrls } from '@/shared/utils/pageUrls'

/** Страница контактов */
function ContactsPage() {
	const t = useTranslations('contactsPage')
	const tPageUrls = useTranslations('pageUrls')

	return (
		<PageWrapper withTop withBottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{tPageUrls(pageUrls.contacts.nameKey)}</Header>
				<p>
					{t.rich('text', {
						telegramUsername: mainConfig.supportTelegramUsername,
						emailAddress: mainConfig.supportEmail,
						telegram: (linkText) => (
							<a href={'https://t.me/' + mainConfig.supportTelegramUsername} className='link'>
								{linkText}
							</a>
						),
						email: (linkText) => (
							<a href={'mailto:' + mainConfig.supportEmail} className='link'>
								{linkText}
							</a>
						),
					})}
				</p>
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default ContactsPage
