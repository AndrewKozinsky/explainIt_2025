import Faq from '@/ui/FAQ/FAQ'
import { config } from './fn/getConfig'
import './FaqOnMainPage.scss'

/** Обёртка для компонента вопросов и ответов главной страницы */
function FaqOnMainPage() {
	return <Faq config={config} />
}

export default FaqOnMainPage
