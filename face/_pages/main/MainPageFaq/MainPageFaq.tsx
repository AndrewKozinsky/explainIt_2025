import Faq from '@/ui/FAQ/FAQ'
import { config } from './fn/getConfig'
import '_pages/main/MainPageFaq/MainPageFaq.scss'

/** Обёртка для компонента вопросов и ответов главной страницы */
function MainPageFaq() {
	return (
		<div className='main-page-faq'>
			<h2 className='main-page-faq__header'>Часто задаваемые вопросы</h2>
			<Faq config={config} />
		</div>
	)
}

export default MainPageFaq
