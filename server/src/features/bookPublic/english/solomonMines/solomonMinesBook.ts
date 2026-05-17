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
	const covers = ['king_solomon_mines_cover_1.jpg']

	return {
		author: 'Henry Rider Haggard',
		name: 'King Solomon\'s mines',
		note: `Роман рассказывает о путешествии охотника и проводника Аллана Квотермейна, который соглашается помочь двум английским джентльменам найти пропавшего брата одного из них. Поиски ведут героев вглубь Африки, к легендарным копям царя Соломона, где, по слухам, скрыты огромные сокровища.

Путь оказывается опасным и почти невозможным. Герои пересекают пустыню, страдают от жажды и усталости, проходят через горы и попадают в неизвестную страну, живущую по своим законам. Там они оказываются втянутыми в борьбу за власть, сталкиваются с жестокостью, предательством, суевериями и военными столкновениями. Постепенно становится ясно, что их путешествие — это не только поиск богатства, но и испытание характера, верности и мужества.

Главный интерес романа — в духе приключения. В книге есть всё, что стало классикой жанра: опасная экспедиция, загадочная карта, потерянная цивилизация, древние сокровища, смертельные испытания и герои, которые должны сохранять хладнокровие в экстремальных ситуациях. Аллан Квотермейн при этом не выглядит идеальным супергероем: он практичен, осторожен, иногда сомневается, но умеет выживать и принимать решения.

Важно помнить, что роман написан в XIX веке и отражает взгляды своего времени. В нём есть колониальный взгляд на Африку и её народы, а некоторые описания сегодня могут казаться устаревшими или стереотипными. Поэтому книгу полезно читать не только как приключенческий роман, но и как текст своей эпохи.

Для изучающего английский язык книга полезна богатой приключенческой лексикой: путешествия, охота, оружие, природа, опасность, военные действия, описание внешности и характера. В тексте много подробных описаний ландшафта, пути, физических трудностей и напряжённых сцен. Диалоги тоже встречаются, но значительная часть романа — это рассказ от первого лица, где Квотермейн подробно объясняет, что происходит и что он думает.

Повествование обычно достаточно прямое: события развиваются быстро, цель героев понятна, а сюжет помогает не потеряться даже при незнакомых словах.

Уровень B2-C1 (Upper-Intermediate / Advanced).`,
		languageCode: languages.en.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#35392b',
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
