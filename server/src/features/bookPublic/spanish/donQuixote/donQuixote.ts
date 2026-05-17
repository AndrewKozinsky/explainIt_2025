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
import { chapter_24 } from './chapter_24'
import { chapter_25 } from './chapter_25'
import { chapter_26 } from './chapter_26'
import { chapter_27 } from './chapter_27'
import { chapter_28 } from './chapter_28'
import { chapter_29 } from './chapter_29'
import { chapter_3 } from './chapter_3'
import { chapter_30 } from './chapter_30'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'

export function donQuixoteBookData(coversFolderName: string) {
	const covers = ['donQuixote_1.jpg']

	return {
		author: 'Miguel de Cervantes Saavedra',
		name: 'Don Quijote de la Mancha',
		note: `Роман рассказывает о пожилом идальго Алонсо Кихано, который слишком много читает рыцарских романов и однажды решает сам стать странствующим рыцарем. Он берёт себе имя Дон Кихот Ламанчский, надевает старые доспехи, выбирает коня Росинанта и отправляется в путь, чтобы защищать слабых, совершать подвиги и прославить свою воображаемую даму сердца — Дульсинею Тобосскую.

Позже к нему присоединяется крестьянин Санчо Панса. Дон Кихот обещает ему богатство и власть, а Санчо становится его оруженосцем. Вместе они путешествуют по Испании и попадают в разные смешные и странные ситуации. Дон Кихот видит мир через призму рыцарских книг: обычные мельницы кажутся ему великанами, постоялые дворы — замками, а простые люди — важными героями или врагами.

Главный интерес книги — в столкновении мечты и реальности. Дон Кихот часто ошибается и выглядит смешным, но при этом он остаётся благородным, смелым и верным своим идеалам. Санчо Панса, наоборот, смотрит на мир более практично, но постепенно тоже начинает меняться под влиянием своего господина. Их разговоры создают один из самых известных литературных дуэтов: мечтателя и реалиста.

Роман можно читать как приключенческую и комическую историю, но в нём есть и более глубокие темы: сила воображения, человеческое достоинство, конфликт между идеалом и повседневной жизнью, влияние книг на человека. Сервантес одновременно высмеивает старые рыцарские романы и показывает, почему людям всё равно нужны мечты, честь и вера в смысл своих поступков.

Для изучающего испанский язык книга полезна тем, что в ней много живых диалогов, описаний путешествий, бытовых сцен и характерной испанской лексики. Особенно интересны разговоры Дон Кихота и Санчо Пансы: в них встречаются разные стили речи — более возвышенный и книжный у Дон Кихота и более простой, народный у Санчо.

Рекомендуемый уровень B1–B2 (Intermediate / Upper-Intermediate)`,
		languageCode: languages.es.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#a68a6a',
	}
}

export const donQuixoteChapters = [
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
	chapter_24,
	chapter_25,
	chapter_26,
	chapter_27,
	chapter_28,
	chapter_29,
	chapter_30,
]
