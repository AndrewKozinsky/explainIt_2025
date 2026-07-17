import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoRepository } from 'repo/video/video.repository'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import { generateSentencesAndSaveToDB } from 'features/common/generateSentencesAndSaveToDB'
import { VideoBase } from 'features/video/VideoBase'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { LanguageCode, Prisma } from 'prisma/generated/client'
import { charadeSubs } from './publicVideosSubtitles/charadeSubs'
import { hisGirlFridaySubs } from './publicVideosSubtitles/hisGirlFridaySubs'

export class CreatePublicVideosCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreatePublicVideosCommand)
export class CreatePublicVideosHandler extends VideoBase implements ICommandHandler<CreatePublicVideosCommand> {
	constructor(
		private prisma: PrismaService,
		private videoRepository: VideoRepository,
		private sentenceRepository: SentenceRepository,
		private subtitleRepository: SubtitleRepository,
		private subtitleSentenceInitRepository: SubtitleSentenceInitRepository,
		mainConfig: MainConfigService,
	) {
		super(mainConfig)
	}

	async execute() {
		const videosData = this.getVideosData()
		const collectionByLang = new Map<string, number>()

		for (let i = 0; i < videosData.length; i++) {
			const videoData = videosData[i]

			const existingVideo = await this.prisma.video.findFirst({
				where: {
					file_s3_key: videoData.file_s3_key,
				},
				select: { id: true },
			})

			if (existingVideo) {
				continue
			}

			const preparedContentResult = this.prepareTextContentForSaving({
				originalContent: videoData.originalContent,
				previousProcessedContent: null,
			})

			if (
				preparedContentResult.originalContentForVideoUpdate === undefined ||
				preparedContentResult.originalContentForVideoUpdate === null ||
				preparedContentResult.processedContentForVideoUpdate === undefined ||
				preparedContentResult.processedContentForVideoUpdate === null ||
				preparedContentResult.contentTypeForVideoUpdate === undefined
			) {
				continue
			}

			const collectionId = await this.getOrCreateCollection(
				collectionByLang,
				videoData.languageCode,
				videoData.name,
			)

			let newVideo: Awaited<ReturnType<VideoRepository['createVideo']>>
			try {
				newVideo = await this.videoRepository.createVideo({
					videoCollectionId: collectionId,
					name: videoData.name,
					note: videoData.note,
					originalContent: preparedContentResult.originalContentForVideoUpdate,
					processedContent: preparedContentResult.processedContentForVideoUpdate,
					contentType: preparedContentResult.contentTypeForVideoUpdate,
					fileName: videoData.fileName,
					fileS3Key: videoData.file_s3_key,
					s3ProviderName: 'cloudRu',
				})
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
					continue
				}
				throw e
			}

			if (preparedContentResult.processedContent !== null) {
				if (preparedContentResult.subtitles) {
					await this.saveSubtitlesSentencesAndInit({
						videoId: newVideo.id,
						preparedContent: preparedContentResult.processedContent,
						languageCode: videoData.languageCode as Language,
						subtitles: preparedContentResult.subtitles,
						sentenceRepository: this.sentenceRepository,
						subtitleRepository: this.subtitleRepository,
						subtitleSentenceInitRepository: this.subtitleSentenceInitRepository,
					})
				} else {
					await generateSentencesAndSaveToDB({
						mainConfigService: this.mainConfig,
						sentenceRepository: this.sentenceRepository,
						processedContent: preparedContentResult.processedContent,
						languageCode: videoData.languageCode as Language,
						videoId: newVideo.id,
					})
				}
			}
		}
	}

	private async getOrCreateCollection(
		collectionByLang: Map<string, number>,
		lang: string,
		name: string,
	): Promise<number> {
		if (collectionByLang.has(lang)) return collectionByLang.get(lang)!

		const existing = await this.prisma.videoCollection.findFirst({
			where: { type: 'public', source_language_code: lang as LanguageCode, name },
			select: { id: true },
		})
		if (existing) {
			collectionByLang.set(lang, existing.id)
			return existing.id
		}

		const created = await this.prisma.videoCollection.create({
			data: {
				type: 'public',
				source_language_code: lang as LanguageCode,
				name,
			},
		})
		collectionByLang.set(lang, created.id)
		return created.id
	}

	getVideosData(): {
		name: string
		languageCode: string
		year: number
		note: string
		fileName: string
		file_s3_key: string
		originalContent: string
		covers: string[]
	}[] {
		const workingMode = this.mainConfig.get().mode!
		const folderName = ['localdev', 'localtest', 'localcheckserver'].includes(workingMode)
			? 'publicVideosDev'
			: 'publicVideos'

		const coversFolderName = this.mainConfig.get().yandexCloud.s3.bucketUrl + '/' + folderName + '/'

		return [
			{
				name: 'Charade', // Charade (1963).mp4
				languageCode: 'en',
				year: 1963,
				note: `Классический детективный триллер в стиле Хичкока с элементами романтической комедии.
Краткий сюжет:
После загадочной смерти мужа в Париже Регина Ламбер (Одри Хепберн) узнаёт, что он похитил крупную сумму денег. На неё начинают охоту трое его сообщников, личность которых неизвестна. Регине предлагает помощь обаятельный, но загадочный незнакомец Питер Джошуа (Кэри Грант), в которого она влюбляется. Однако она не может быть уверена, кто он на самом деле: её защитник или же один из преследующих её преступников, скрывающийся под ложным именем.
Речь чёткая и спокойная, актёры говорят естественно и без постоянных перебиваний. Стандартный разговорный английский. Много повседневной лексики (отношения, деньги, доверие, опасность). У Audrey Hepburn и Cary Grant очень ясная, «учебная» речь.
Уровень B1-B2.`,
				fileName: 'Charade (1963).mp4',
				file_s3_key: folderName + '/english/Charade (1963).mp4',
				originalContent: charadeSubs,
				covers: [
					coversFolderName + 'english/charade_1.jpg',
					coversFolderName + 'english/charade_2.jpg',
					coversFolderName + 'english/charade_3.jpg',
					coversFolderName + 'english/charade_4.jpg',
				],
			},
			{
				name: 'His Girl Friday', // His Girl Friday (1940).mp4
				languageCode: 'en',
				year: 1940,
				note: `Остроумная комедия о журналистах.
Главная героиня, Хилди Джонсон, — талантливая репортёрша, собирается уйти с работы и выйти замуж. Но её бывший муж и редактор газеты, Уолтер Бёрнс, пытается удержать её в профессии. В это время появляется срочная новость: человека собираются казнить, и дело может быть несправедливым. Хилди начинает расследование, и события развиваются очень быстро.
Живые диалоги, быстрая разговорная речь, много юмора и сарказма, журналистская и повседневная лексика. Это фильм о работе, амбициях, любви и о том, как трудно выбрать между карьерой и личной жизнью.
Рекомендуемый уровень: B2-C1 (Upper-Intermediate / Advanced).`,
				fileName: 'His Girl Friday (1940).webm',
				file_s3_key: folderName + '/english/His Girl Friday (1940).mp4',
				originalContent: hisGirlFridaySubs,
				covers: [
					coversFolderName + 'english/his_girl_friday_1.jpg',
					coversFolderName + 'english/his_girl_friday_2.jpg',
					coversFolderName + 'english/his_girl_friday_3.jpg',
					coversFolderName + 'english/his_girl_friday_4.jpg',
				],
			},
		]
	}
}
