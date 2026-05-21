import { languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'
import { chapter_10 } from './chapter_10'
import { chapter_11 } from './chapter_11'
import { chapter_12 } from './chapter_12'
import { chapter_13 } from './chapter_13'
import { chapter_14 } from './chapter_14'
import { chapter_15 } from './chapter_15'
import { chapter_16 } from './chapter_16'
import { chapter_17 } from './chapter_17'
import { chapter_18 } from './chapter_18'
import { chapter_19 } from './chapter_19'
import { chapter_2 } from './chapter_2'
import { chapter_20 } from './chapter_20'
import { chapter_21 } from './chapter_21'
import { chapter_22 } from './chapter_22'
import { chapter_23 } from './chapter_23'
import { chapter_24 } from './chapter_24'
import { chapter_25 } from './chapter_25'
import { chapter_26 } from './chapter_26'
import { chapter_27 } from './chapter_27'
import { chapter_28 } from './chapter_28'
import { chapter_29 } from './chapter_29'
import { chapter_3 } from './chapter_3'
import { chapter_30 } from './chapter_30'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'

// https://www.livrosgratis.com.br/ler-livro-online-99606/cuore

export function heartBookData(coversFolderName: string) {
	const covers = ['heart_1.jpg']

	return {
		author: 'Edmondo De Amicis',
		name: 'Cuore',
		note: `Книга рассказывает о жизни итальянских детей, семье, школе, дружбе, долге и воспитании характера. В центре повествования — мир ученика, который наблюдает за одноклассниками, учителями и родителями, учится понимать других людей и постепенно взрослеет. Большое внимание уделяется обычным школьным ситуациям: урокам, отношениям между детьми, успехам и неудачам, помощи слабым, уважению к старшим.

Главный интерес книги — не в остром сюжете, а в нравственном и эмоциональном содержании. Автор показывает, каким должен быть честный, добрый и ответственный человек. Герои часто сталкиваются с выбором: поступить эгоистично или проявить сочувствие, помочь товарищу, признать ошибку, поддержать семью. Поэтому книга воспринимается не только как история о детстве, но и как размышление о воспитании, гражданском чувстве и человеческом достоинстве.

Стиль Де Амичиса достаточно ясный и выразительный. В тексте много описаний чувств, семейных разговоров, школьной лексики и слов, связанных с моральными качествами: доброта, мужество, благодарность, уважение, трудолюбие. Для изучающего итальянский язык это полезно, потому что книга помогает расширить словарный запас в темах «семья», «школа», «характер», «общество», «эмоции».

Книга подходит тем, кто хочет читать классическую итальянскую прозу и одновременно познакомиться с важной частью итальянской культуры.

Уровень B1–B2.`,
		languageCode: languages.it.code,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#b54736',
	}
}

export const heartChapters = [
	chapter_1,
	chapter_2,
	chapter_3,
	chapter_4,
	chapter_5,
	chapter_6,
	chapter_7,
	chapter_8,
	chapter_9,
	chapter_10,
	chapter_11,
	chapter_12,
	chapter_13,
	chapter_14,
	chapter_15,
	chapter_16,
	chapter_17,
	chapter_18,
	chapter_19,
	chapter_20,
	chapter_21,
	chapter_22,
	chapter_23,
	chapter_24,
	chapter_25,
	chapter_26,
	chapter_27,
	chapter_28,
	chapter_29,
	chapter_30,
]
