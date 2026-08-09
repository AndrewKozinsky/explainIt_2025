import { languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'

export function littleRedRidingHoodBookData(s3FolderName: string) {
	const coverFileName = 'littleRedRidingHood.jpg'

	return {
		author: 'Brüder Grimm',
		name: 'Rotkäppchen',
		about: `Классическая сказка про Красную Шапочку.
Много диалогов помогающих изучать разговорные конструкции. Используется относительно простой и повторяющийся словарный запас. Сюжет хорошо известен, поэтому текст легче понимать даже с незнакомыми словами.
Рекомендуемый уровень A2-B1`,
		languageCode: languages.de.code,
		coverFileName: coverFileName,
		coverFileS3Key: s3FolderName + coverFileName,
	}
}

export const littleRedRidingHoodChapters = [chapter_1]
