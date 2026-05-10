import { Language, languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'
import { chapter_2 } from './chapter_2'
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'

export function aStudyInScarletPartOneBookData(coversFolderName: string) {
	const covers = ['a_study_in_scarlet_part_one_cover_1.jpg']

	return {
		author: 'Arthur Conan Doyle',
		name: 'A study on scarlet (part 1)',
		note: `Рассказ ведётся от лица доктора Ватсона — военного врача, который возвращается в Лондон после войны. Он знакомится с Шерлоком Холмсом и вместе с ним снимает квартиру на Бейкер-стрит. Вскоре Ватсон понимает, что Холмс — необычный человек с выдающимися способностями к логике и наблюдению.

Они сталкиваются с загадочным убийством. На месте преступления нет очевидных улик, но Холмс по мелким деталям начинает восстанавливать картину произошедшего. Он делает выводы, которые кажутся невероятными, но постепенно оказываются точными. Ватсон наблюдает за его методом и пытается понять, как работает его мышление.

Главный интерес первой части — не только в расследовании, но и в том, как Холмс объясняет свои выводы и учит «читать» факты.

Дойл использует достаточно ясный и логичный язык. В книге много описаний (внешности, мест, деталей преступления), логических объяснений (как Холмс делает выводы) и диалогов между Ватсоном и Холмсом. Это помогает понимать структуру английских предложений, учиться объяснять мысли и делать выводы, запоминать лексику, связанную с наблюдением, анализом и повседневной жизнью.

Также книга даёт хороший пример того, как один и тот же факт можно описать точно и по-разному — это важно для развития речи.

Уровень B1-B2 (Intermediate / Upper-Intermediate).`,
		languageCode: languages.en.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#6C8084',
	}
}

export const aStudyInScarletPartOneChapters = [
	chapter_1,
	chapter_2,
	chapter_3,
	chapter_4,
	chapter_5,
	chapter_6,
	chapter_7,
]
