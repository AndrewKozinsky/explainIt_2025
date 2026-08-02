import { languages } from 'utils/languages'
import { charadeSubs } from './charadeSubs'

export function charadeVideoData(s3FolderName: string, coverS3FolderName: string) {
	return {
		// Collection fields
		name: 'Charade',
		languageCode: languages.en.code,
		note: `Классический детективный триллер в стиле Хичкока с элементами романтической комедии.
Краткий сюжет:
После загадочной смерти мужа в Париже Регина Ламбер (Одри Хепберн) узнаёт, что он похитил крупную сумму денег. На неё начинают охоту трое его сообщников, личность которых неизвестна. Регине предлагает помощь обаятельный, но загадочный незнакомец Питер Джошуа (Кэри Грант), в которого она влюбляется. Однако она не может быть уверена, кто он на самом деле: её защитник или же один из преследующих её преступников, скрывающийся под ложным именем.
Речь чёткая и спокойная, актёры говорят естественно и без постоянных перебиваний. Стандартный разговорный английский. Много повседневной лексики (отношения, деньги, доверие, опасность). У Audrey Hepburn и Cary Grant очень ясная, «учебная» речь.
Уровень B1-B2.`,
		coverFileName: 'charade.jpg',
		coverFileS3Key: coverS3FolderName + 'english/charade.jpg',
		// Video fields
		fileName: 'Charade (1963).mp4',
		file_s3_key: s3FolderName + 'english/Charade (1963).mp4',
		originalContent: charadeSubs,
	}
}
