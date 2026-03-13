import { Language, languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'

export function littleRedRidingHoodBookData(coversFolderName: string) {
	const covers = ['wizard_of_oz_cover_1.jpg']

	return {
		author: 'Brüder Grimm',
		name: 'Rotkäppchen',
		note: `Классическая коротка и понятная сказка про Красную Шапочку.
Много диалогов, которые помогают изучать разговорные конструкции. Используется относительно простой и повторяющийся словарный запас. Сюжет хорошо известен, поэтому текст легче понимать даже с незнакомыми словами.
Рекомендуемый уровень A2-B1 (Pre-intermediate / Intermediate)`,
		languageCode: languages.de.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#313B3C',
	}
}

export const littleRedRidingHood = [chapter_1]
