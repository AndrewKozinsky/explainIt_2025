import { Language, languages } from 'utils/languages'
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
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'

export function theCountOfMonteCristoBookData(coversFolderName: string) {
	const covers = ['the_count_of_monte_cristo_cover_1.jpg']

	return {
		author: 'Alexandre Dumas',
		name: 'Le Comte de Monte-Cristo',
		note: `Роман о несправедливом заключении и блестящем мести. Эдмон Дантес, молодой моряк, накануне свадьбы арестован по ложному доносу и брошен в замок Иф. После побега он находит сокровище и начинает мстить тем, кто разрушил его жизнь.

Классика французской литературы с богатым языком, живыми диалогами и захватывающим сюжетом. В книге много разговорной речи, юридических и морских терминов, описаний французского общества начала XIX века.

Уровень B2-C1 (Upper-Intermediate / Advanced).`,
		languageCode: languages.fr.code as Language,
		freeToUse: false,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#2c1810',
	}
}

export const theCountOfMonteCristoChapters = [
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
]
