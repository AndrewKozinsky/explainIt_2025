import { PrevAndNextButtons, PrevAndNextButtonsTextColor } from '../PrevAndNextButtons/PrevAndNextButtons'
import ArticleType from '../../../../articles/articleTypes/articleType'
import { getPrevAndNextArticlesNavConfig } from './fn/getPrevAndNextButtonsConfig'

type PrevAndNextArticlesNavProps = {
	textColor?: PrevAndNextButtonsTextColor
	prevArticle: ArticleType.Art | null
	nextArticle: ArticleType.Art | null
}

/** Блок с кнопками-ссылками на предыдущую и следующую статью */
export function PrevAndNextArticlesNav(props: PrevAndNextArticlesNavProps) {
	const { textColor, prevArticle, nextArticle } = props

	const { prevBtnConfig, nextBtnConfig } = getPrevAndNextArticlesNavConfig(prevArticle, nextArticle)

	return <PrevAndNextButtons backConfig={prevBtnConfig} nextConfig={nextBtnConfig} textColor={textColor} />
}
