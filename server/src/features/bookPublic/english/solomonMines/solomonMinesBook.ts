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
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'
import { intro } from './intro'

export function solomonMinesBookData(coversFolderName: string) {
	const covers = ['king_solomon_mines_cover_2.jpg', 'king_solomon_mines_cover_1.jpg']

	return {
		author: 'Henry Rider Haggard',
		name: 'King Solomon\'s mines',
		note: `Погоня за легендарными алмазами в самом сердце неисследованной Африки. Охотник Аллан Квотермейн ведёт двух джентльменов через смертоносные пустыни, заснеженные горы и земли воинственных племён, чтобы найти потерянные сокровища и пропавшего брата. Это эталон приключенческого романа: закрученный сюжет, экзотические опасности, предательства и кодекс чести, где богатство — не главная цель. Хаггард создал мир, который вдохновил «Индиану Джонса».
Книга читается сложнее, чем другие приключенческие истории. Предложения нередко длинные, с описаниями природы и быта. Встречается устаревшая лексика XIX века и слова, связанные с путешествиями и военным делом. Диалоги есть, но повествование часто подробное и описательное.
Уровень B2-C1 (Upper-Intermediate / Advanced).`,
		languageCode: languages.en.code as Language,
		freeToUse: false,
		covers: covers.map((cover) => coversFolderName + cover),
	}
}

export const solomonMinesChapters = [
	intro,
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
]
