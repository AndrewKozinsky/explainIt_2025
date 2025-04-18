import { useMemo } from 'react'
import FaqTypes from '../../../../ui/FAQ/fn/faqTypes'
import ArticleBuilder from '../../../ArticleBuilder/ArticleBuilder'
import ArticleType from '../../../articleTypes/articleType'

/**
 * Принимает объект конфигурации для построения блока Вопросов и ответов и возвращает улученную версию.
 * @param config — объект конфигурации для построения блока Вопросов и ответов
 */
export function useGetConfig(config: ArticleType.Faq): FaqTypes.Config {
	return useMemo(function () {
		return config.items.map((faqItem) => {
			const question: FaqTypes.Question =
				faqItem.question.type === 'plain'
					? {
							type: 'plain',
							value: faqItem.question.value,
						}
					: {
							type: 'ReactNode',
							value: <ArticleBuilder articleContent={faqItem.question.value} />,
						}

			const answer: FaqTypes.Answer =
				faqItem.answer.type === 'plain'
					? {
							type: 'plain',
							value: faqItem.answer.value,
						}
					: {
							type: 'ReactNode',
							value: <ArticleBuilder articleContent={faqItem.answer.value} />,
						}

			return {
				question,
				answer,
			}
		})
	}, [])
}
