import { Language, languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'
import { chapter_2 } from './chapter_2'
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'

export function aStudyInScarletPartTwoBookData(coversFolderName: string) {
	const covers = ['a_study_in_scarlet_part_two_cover_1.jpg']

	return {
		author: 'Arthur Conan Doyle',
		name: 'A study on scarlet (part 2)',
		note: `Рассказ резко меняет направление и переносит читателя в Америку. История уже не ведётся от лица Ватсона и почти не связана с Холмсом напрямую. Здесь показаны события прошлого, которые объясняют причины преступления.

В центре сюжета — Джон Феррье, его приёмная дочь Люси и Джефферсон Хоуп. Они живут в закрытом религиозном сообществе с жёсткими правилами. Когда Люси вынуждают выйти замуж против своей воли, начинается конфликт. Хоуп пытается спасти её, и история превращается в драму с погоней, выбором и местью.

Главный интерес этой части — в том, как постепенно раскрывается мотивация преступника из первой части. Читатель видит не просто «кто виноват», а почему всё произошло.

Дойл использует более описательный и эмоциональный язык. В тексте много описаний природы, быта и напряжённых ситуаций. Диалогов меньше, но больше повествования и чувств. Это помогает расширить словарный запас (эмоции, природа, движение), привыкнуть к длинным предложениям и лучше понимать связный текст.

Книга показывает, как английский язык используется не только для логики и анализа, но и для передачи атмосферы и переживаний.

Уровень B1–B2 (Intermediate / Upper-Intermediate).`,
		languageCode: languages.en.code as Language,
		freeToUse: false,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#786e60',
	}
}

export const aStudyInScarletPartTwoChapters = [
	chapter_1,
	chapter_2,
	chapter_3,
	chapter_4,
	chapter_5,
	chapter_6,
	chapter_7,
]
