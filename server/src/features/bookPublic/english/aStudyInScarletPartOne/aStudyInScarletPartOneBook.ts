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
		note: `Рассказ ведётся от лица лётчика потерпевшего аварию в пустыне Сахара. Там он встречает Маленького принца — мальчика с другой планеты. Принц путешествует по разным астероидам и встречает странных взрослых, каждый из которых занят чем-то бессмысленным. На Земле принц встречает лиса, который учит его дружбе и ответственности. Принц понимает, что его роза — единственная в мире, потому что он её полюбил. Змея помогает ему вернуться на свою планету, а лётчик остаётся с воспоминаниями о друге.

Сент-Экзюпери пишет короткими, ясными фразами. В книге много диалогов — это помогает привыкать к разговорной речи и запоминать вопросы, ответы, вежливые формы.

Книга учит говорить о сложных чувствах (дружба, любовь, одиночество) простыми словами — это полезно для развития устной речи.

Уровень A2-B1 (Beginner / Intermediate).`,
		languageCode: languages.en.code as Language,
		freeToUse: false,
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
