import React from 'react'
import { Link } from '@/i18n/routing'
import { pageUrls } from '@/utils/pageUrls'
import './RuFooter.scss'

function RuFooter() {
	return (
		<footer className='page-wrapper__bottom'>
			<p className='page-wrapper__legal-text-wrapper'>
				<Link className='link' href={pageUrls.docs.privacyPolicy.path}>
					{pageUrls.docs.privacyPolicy.name}
				</Link>
				<Link className='link' href={pageUrls.docs.offer.path}>
					{pageUrls.docs.offer.name}
				</Link>
			</p>
			<p className='page-wrapper__legal-text-wrapper'>
				<span>Самозанятый Козинский Андрей Сергеевич</span>
				<span>ИНН: 560912925372</span>
				<span>Россия, Оренбург</span>
				<span>andkozinskiy@yandex.ru</span>
				<span>Переводы выполняются автоматически с использованием ИИ. Возможны неточности.</span>
			</p>
		</footer>
	)
}

export default RuFooter
