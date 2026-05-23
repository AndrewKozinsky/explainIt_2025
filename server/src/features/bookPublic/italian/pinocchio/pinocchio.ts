import { languages } from 'utils/languages'
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
import { chapter_31 } from './chapter_31'
import { chapter_32 } from './chapter_32'
import { chapter_33 } from './chapter_33'
import { chapter_34 } from './chapter_34'
import { chapter_35 } from './chapter_35'
import { chapter_36 } from './chapter_36'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'

// https://www.gutenberg.org/files/52484/52484-h/52484-h.htm

export function pinocchioBookData(coversFolderName: string) {
	const covers = ['pinocchio_1.jpg']

	return {
		author: 'Carlo Collodi',
		name: 'Le Avventure di Pinocchio',
		note: `Сказка рассказывает о деревянной кукле Пиноккио, которую мастер Джеппетто вырезает из полена. Пиноккио оживает, но ведёт себя как непослушный и очень любопытный ребёнок: он убегает из дома, не хочет ходить в школу, легко верит обманщикам и постоянно попадает в опасные ситуации.

По ходу истории Пиноккио встречает разных персонажей: Говорящего Сверчка, Лису и Кота, добрую Фею с голубыми волосами, кукольника Манджафуоко и других. Каждый эпизод становится для него уроком, но он далеко не сразу учится на своих ошибках. Его путь — это постепенное взросление: от капризной и легкомысленной куклы к тому, кто начинает понимать ответственность, труд, честность и любовь к отцу.

Главный интерес книги не только в приключениях, но и в её моральном и социальном смысле. Коллоди показывает детский мир с юмором, иронией и иногда довольно жёсткими последствиями плохих поступков. В отличие от многих современных адаптаций, оригинальная история может быть более мрачной, сатирической и резкой. Это не просто добрая сказка, а произведение о воспитании, бедности, соблазнах, лжи и необходимости делать выбор.

Для изучающего итальянский язык книга полезна тем, что в ней много живых диалогов, бытовой лексики, эмоциональных выражений и повествовательных конструкций. Текст помогает познакомиться с классическим литературным итальянским, при этом сюжет остаётся понятным благодаря ярким сценам и повторяющимся мотивам.

Уровень B1–B2.`,
		languageCode: languages.it.code,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#ad9c85',
	}
}

export const pinocchioChapters = [
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
	chapter_31,
	chapter_32,
	chapter_33,
	chapter_34,
	chapter_35,
	chapter_36,
]
