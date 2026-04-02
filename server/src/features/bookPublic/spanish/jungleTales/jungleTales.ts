import { Language, languages } from 'utils/languages'
import { chapter_1 } from './chapter_1'
import { chapter_2 } from './chapter_2'
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'

export function jungleTalesBookData(coversFolderName: string) {
	const covers = ['jungleTales_1.jpg']

	return {
		author: 'Horacio Quiroga',
		name: 'Cuentos de la selva',
		note: `Сборник рассказов написан уругвайским писателем Horacio Quiroga и переносит читателя в густые джунгли Южной Америки.

Действие происходит в сельве — дикой, живой и немного опасной. Главные герои здесь — животные: ягуары, попугаи, коати, черепахи. Они думают, чувствуют, дружат, ошибаются и сталкиваются с трудностями, почти как люди. Короткие и запоминающиеся сюжеты: животные помогают друг другу в беде, противостоят опасностям джунглей или сталкиваться с человеком — существом, которое здесь часто выглядит самым непредсказуемым. В этих историю есть и напряжение, и даже немного жесткости, что делает их более живыми и настоящими.

Главный интерес книги — в атмосфере и простоте подачи. Ты как будто оказываешься внутри тропического леса: слышишь звуки, видишь цвета, ощущаешь жару и влажность.

Язык у Квироги достаточно простой и прямой: много коротких предложений, часто используется повторяющаяся лексика, диалоги и действия преобладают над сложными рассуждениями. Это делает книгу удобной для изучающих испанский: вы быстро начинаете понимать структуру фраз, запоминать базовую лексику (животные, природа, действия) и не перегружаетесь сложной грамматикой.

Отдельный плюс — рассказы короткие. Можно читать по одному за раз и чувствовать завершённость, а не «тащить» длинный роман.

Рекомендуемый уровень A2-B1 (Pre-intermediate / Intermediate)`,
		languageCode: languages.es.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#475336',
	}
}

export const jungleTalesChapters = [
	chapter_1,
	chapter_2,
	chapter_3,
	chapter_4,
	chapter_5,
	chapter_6,
	chapter_7,
	chapter_8,
]
