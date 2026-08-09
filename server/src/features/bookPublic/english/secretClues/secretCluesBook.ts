import { languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'

export function secretCluesBookData(s3FolderName: string) {
	const coverFileName = 'secretClues.jpg'

	return {
		author: 'Fiona Kelly',
		name: 'Secret clues',
		about: `Рассказ ведётся


Уровень B1-B2.`,
		languageCode: languages.en.code,
		coverFileName: coverFileName,
		coverFileS3Key: s3FolderName + coverFileName,
	}
}

export const secretCluesChapters = [chapter_1]
