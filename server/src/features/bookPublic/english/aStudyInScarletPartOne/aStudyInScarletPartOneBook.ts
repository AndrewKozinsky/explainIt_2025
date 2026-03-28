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
		note: `Девочка Дороти и её
Рекомендуемый уровень B1 (Intermediate)`,
		languageCode: languages.en.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#937F43',
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
