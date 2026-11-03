import Faq from '@/shared/ui/FAQ/FAQ'
import MainPageHeader from '../MainPageHeader/MainPageHeader'
import { config } from './fn/getConfig'
import './MainPageFaq.scss'

/** Обёртка для компонента вопросов и ответов главной страницы */
function MainPageFaq() {
	return (
		<div className='main-page-faq'>
			<div className='main-page-faq__content'>
				<MainPageHeader text='Часто задаваемые вопросы' extraClass='main-page-faq__header' />
				<Faq config={config} />
			</div>
		</div>
	)
}

export default MainPageFaq
