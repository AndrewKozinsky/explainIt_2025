import { languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'

export function secretCluesBookData(coversFolderName: string) {
	const covers = ['secretClues_cover_1.jpg']

	return {
		author: 'Fiona Kelly',
		name: 'Secret clues',
		note: `Рассказ ведётся


Уровень B1-B2.`,
		languageCode: languages.en.code,
		covers: covers.map((cover) => coversFolderName + cover),
	}
}

export const secretCluesChapters = [chapter_1]
