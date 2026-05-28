// import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
// import { getCategories } from '../fn/getCategories'
// import GrammarLink from '../GrammarLink/GrammarLink'

/*export default async function GrammarCategoriesList() {
	const categories = await getCategories()

	const bySourceLang = new Map<string, typeof categories>()

	for (const cat of categories) {
		const list = bySourceLang.get(cat.sourceLanguage) || []
		list.push(cat)
		bySourceLang.set(cat.sourceLanguage, list)
	}

	const languageLabels: Record<string, string> = {
		en: 'Английский',
		es: 'Испанский',
		fr: 'Французский',
		de: 'Немецкий',
		it: 'Итальянский',
		tr: 'Турецкий',
	}

	const categoryLabels: Record<string, string> = {
		expressions: 'Выражения',
		phrasalVerbs: 'Фразовые глаголы',
		collocation: 'Коллокации',
		conditional: 'Условные предложения',
		inversion: 'Инверсия',
		gerundVsInfinitive: 'Герундий vs Инфинитив',
		reportedSpeech: 'Косвенная речь',
		subjunctive: 'Сослагательное наклонение',
		serVsEstar: 'Ser vs Estar',
		porVsPara: 'Por vs Para',
		partitiveArticles: 'Партитивные артикли',
		separableVerbs: 'Отделяемые глаголы',
		cases: 'Падежи',
		wordOrder: 'Порядок слов',
		modalParticles: 'Модальные частицы',
		agglutination: 'Агглютинация',
		evidentiality: 'Эвиденциальность',
		other: 'Другое',
	}

	return (
		<div>
			{[...bySourceLang.entries()].map(([sourceLang, cats]) => (
				<SectionWithHeader key={sourceLang} title={languageLabels[sourceLang] || sourceLang}>
					{cats.map((cat) => (
						<GrammarLink
							key={`${cat.sourceLanguage}-${cat.category}`}
							name={categoryLabels[cat.category] || cat.category}
							href={`/grammar/${cat.sourceLanguage}/${cat.category}`}
						/>
					))}
				</SectionWithHeader>
			))}
		</div>
	)
}*/
