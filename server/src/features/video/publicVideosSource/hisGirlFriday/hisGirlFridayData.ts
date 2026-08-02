import { languages } from 'utils/languages'
import { hisGirlFridaySubs } from './hisGirlFridaySubs'

export function hisGirlFridayVideoData(s3FolderName: string, coverS3FolderName: string) {
	return {
		// Collection fields
		name: 'His Girl Friday',
		languageCode: languages.en.code,
		note: `Остроумная комедия о журналистах.
Главная героиня, Хилди Джонсон, — талантливая репортёрша, собирается уйти с работы и выйти замуж. Но её бывший муж и редактор газеты, Уолтер Бёрнс, пытается удержать её в профессии. В это время появляется срочная новость: человека собираются казнить, и дело может быть несправедливым. Хилди начинает расследование, и события развиваются очень быстро.
Живые диалоги, быстрая разговорная речь, много юмора и сарказма, журналистская и повседневная лексика. Это фильм о работе, амбициях, любви и о том, как трудно выбрать между карьерой и личной жизнью.
Рекомендуемый уровень: B2-C1 (Upper-Intermediate / Advanced).`,
		coverFileName: 'his_girl_friday.jpg',
		coverFileS3Key: coverS3FolderName + 'english/his_girl_friday.jpg',
		// Video fields
		fileName: 'His Girl Friday (1940).webm',
		file_s3_key: s3FolderName + 'english/His Girl Friday (1940).mp4',
		originalContent: hisGirlFridaySubs,
	}
}
