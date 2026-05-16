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
import { chapter_3 } from './chapter_3'
import { chapter_4 } from './chapter_4'
import { chapter_5 } from './chapter_5'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'

export function theCountOfMonteCristoBookData(coversFolderName: string) {
	const covers = ['the_count_of_monte_cristo_cover_1.jpg']

	return {
		author: 'Alexandre Dumas',
		name: 'Le Comte de Monte-Cristo',
		note: `Роман рассказывает об Эдмоне Дантесе — молодом моряке, у которого, кажется, впереди счастливая жизнь: он должен стать капитаном и жениться на любимой девушке Мерседес. Но зависть и политические интриги разрушают его судьбу. По ложному доносу Дантеса арестовывают и без суда отправляют в замок Иф — страшную тюрьму, откуда почти невозможно выбраться.

В заключении Эдмон знакомится с аббатом Фариа, который становится для него учителем и другом. Фариа помогает ему понять, кто предал его, даёт знания и открывает тайну огромного сокровища. После побега Дантес находит это богатство и возвращается в общество уже под новым именем — граф Монте-Кристо. Теперь он богат, образован, хладнокровен и готов отомстить тем, кто разрушил его жизнь.

Главный интерес романа — не только в мести, но и в том, как меняется сам герой. Дантес проходит путь от доверчивого молодого человека до почти мифической фигуры, которая управляет судьбами других людей. Но постепенно возникает вопрос: имеет ли человек право быть судьёй и наказывать других? Дюма показывает, что месть может приносить не только удовлетворение, но и внутреннюю пустоту.

В книге много приключений, тайн, переодеваний, неожиданных встреч, заговоров и драматических сцен. При этом роман даёт широкую картину французского общества XIX века: моряки, чиновники, аристократы, банкиры, судьи, военные и преступники живут в одном сложном мире, где деньги, связи и репутация часто решают судьбу человека.

Для изучающего язык книга полезна богатством стилей и ситуаций. В ней есть живые диалоги, эмоциональные признания, официальная речь, письма, судебная и политическая лексика, а также слова, связанные с морем, тюрьмой, деньгами, наследством и светским обществом. Это помогает расширять словарный запас и привыкать к более длинным классическим предложениям.

Язык Дюма обычно динамичнее и легче, чем у многих других классиков: сюжет быстро движется вперёд, диалоги помогают понимать происходящее, а главы часто заканчиваются интригой.

Уровень B2-C1 (Upper-Intermediate / Advanced).`,
		languageCode: languages.fr.code as Language,
		freeToUse: true,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#265463',
	}
}

export const theCountOfMonteCristoChapters = [
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
]
