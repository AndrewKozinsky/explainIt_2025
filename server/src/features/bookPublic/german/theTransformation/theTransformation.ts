import { Language, languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'
import { chapter_2 } from './chapter_2'
import { chapter_3 } from './chapter_3'

export function theTransformationBookData(coversFolderName: string) {
	const covers = ['theTransformation_1.jpg']

	return {
		author: 'Franz Kafka',
		name: 'Die Verwandlung',
		note: `Грегор Замза, молодой коммивояжёр, однажды утром просыпается в теле огромного жука. Он не столько ужасается своему облику, сколько переживает, что опоздает на работу — ведь он кормит всю семью.

Когда ему удаётся открыть дверь, семья и присланный начальник в ужасе отшатываются. Грегора запирают в комнате, кормят объедками. Семья быстро устаёт от этого бремени. Отец закидывает его яблоками (одно застревает в панцире), сестра, прежде заботливая, заявляет: «Это больше не Грегор». Грегор понимает, что стал обузой, перестаёт есть и умирает. Семья вздыхает с облегчением и строит планы на будущее.

Кафка использует ровный, ясный, почти бюрократический язык. В книге много внутренних монологов, бытовых описаний и диалогов за дверью. Это помогает учиться выражать эмоции через простые конструкции и запоминать лексику на темы «дом», «семья», «работа».

Уровень B1-B2.`,
		languageCode: languages.de.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#6c6558',
	}
}

export const theTransformationChapters = [chapter_1, chapter_2, chapter_3]
