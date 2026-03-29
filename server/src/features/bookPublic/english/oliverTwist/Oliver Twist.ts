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
import { chapter_31 } from './chapter_31'
import { chapter_32 } from './chapter_32'
import { chapter_33 } from './chapter_33'
import { chapter_34 } from './chapter_34'
import { chapter_35 } from './chapter_35'
import { chapter_36 } from './chapter_36'
import { chapter_37 } from './chapter_37'
import { chapter_38 } from './chapter_38'
import { chapter_39 } from './chapter_39'
import { chapter_4 } from './chapter_4'
import { chapter_40 } from './chapter_40'
import { chapter_41 } from './chapter_41'
import { chapter_42 } from './chapter_42'
import { chapter_44 } from './chapter_44'
import { chapter_45 } from './chapter_45'
import { chapter_46 } from './chapter_46'
import { chapter_47 } from './chapter_47'
import { chapter_48 } from './chapter_48'
import { chapter_49 } from './chapter_49'
import { chapter_5 } from './chapter_5'
import { chapter_50 } from './chapter_50'
import { chapter_51 } from './chapter_51'
import { chapter_52 } from './chapter_52'
import { chapter_53 } from './chapter_53'
import { chapter_6 } from './chapter_6'
import { chapter_7 } from './chapter_7'
import { chapter_8 } from './chapter_8'
import { chapter_9 } from './chapter_9'

export function oliverTwistBookData(coversFolderName: string) {
	const covers = ['oliver_twist_cover_1.jpg']

	return {
		author: 'Charles Dickens',
		name: 'Oliver Twist',
		note: `Роман о судьбе сироты в жестоком мире викторианской Англии. Он растёт в бедности и страданиях. Не выдержав тяжёлой жизни, Оливер убегает в Лондон. В городе он попадает в банду промышляющей карманными кражам. Оливер не хочет становиться преступником, но его пытаются втянуть в преступный мир. В этой части важную роль играет Нэнси — девушка из банды, которая жалеет Оливера и пытается ему помочь. История постепенно раскрывает тайну происхождения Оливера: он оказывается сыном из уважаемой семьи. Злодеи получают наказание, а Оливер находит дом, любовь и спокойную жизнь.

Диккенс использует богатый английский язык и живые диалоги. Это помогает понять, как звучит живой английский. В книге много разговорной речи (просьбы, угрозы и эмоции, бытовые разговоры), повторяющаяся лексика (на тему бедности, преступлений, эмоций), разные стили речи (формальную речь, простую разговорную). Это даёт хорошее понимание регистров языка.

Книга помогает чувствовать ритм английских предложений, понимать, как строятся описания, видеть, как создаётся атмосфера через слова.

Уровень B1-B2 (Intermediate / Upper-Intermediate).`,
		languageCode: languages.en.code as Language,
		freeToUse: false,
		covers: covers.map((cover) => coversFolderName + cover),
		coverBackgroundColor: '#343f3f',
	}
}

export const oliverTwistChapters = [
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
	chapter_37,
	chapter_38,
	chapter_39,
	chapter_40,
	chapter_41,
	chapter_42,
	chapter_42,
	chapter_44,
	chapter_45,
	chapter_46,
	chapter_47,
	chapter_48,
	chapter_49,
	chapter_50,
	chapter_51,
	chapter_52,
	chapter_53,
]
