import { Injectable } from '@nestjs/common'
import { SentenceRepository } from 'repo/sentence.repository'
import { PrismaService } from 'db/prisma.service'

export type SentenceSourceInfo = {
	kind: 'book' | 'video'
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: number
	/** Полный текст главы/субтитров, из которого берутся offsets предложений. */
	wholeText: string
}

export type SentenceNeighbors = {
	/** Выделенное предложение. */
	selected: string
	/** Предложения до выделенного, в порядке текста. */
	before: string[]
	/** Предложения после выделенного, в порядке текста. */
	after: string[]
}

@Injectable()
export class SentenceChatContextBuilder {
	constructor(
		private sentenceRepository: SentenceRepository,
		private prisma: PrismaService,
	) {}

	/** Собирает метаданные источника и окружение предложения для передачи в LLM. */
	async buildForSentence(
		sentenceId: number,
		beforeCount: number,
		afterCount = 0,
	): Promise<null | { source: SentenceSourceInfo; neighbors: SentenceNeighbors }> {
		const sentence = await this.sentenceRepository.getSentenceDbById(sentenceId)
		if (!sentence) return null

		const source = this.extractSourceInfo(sentence)
		if (!source) return null

		const selectedText = source.wholeText.slice(sentence.start_offset, sentence.start_offset + sentence.length)

		const neighborSentences = await this.fetchNeighborSentences({
			sentenceId,
			orderIndex: sentence.order_index,
			bookChapterId: sentence.book_chapter_id,
			videoPrivateId: sentence.video_private_id,
			videoPublicId: sentence.video_public_id,
			beforeSentences: beforeCount,
			afterSentences: afterCount,
		})

		const before: string[] = []
		const after: string[] = []

		for (const s of neighborSentences) {
			const text = source.wholeText.slice(s.start_offset, s.start_offset + s.length)

			if (s.order_index < sentence.order_index) {
				before.push(text)
			} else if (s.order_index > sentence.order_index) {
				after.push(text)
			}
		}

		return {
			source,
			neighbors: {
				selected: selectedText,
				before,
				after,
			},
		}
	}

	private extractSourceInfo(
		sentence: NonNullable<Awaited<ReturnType<SentenceRepository['getSentenceDbById']>>>,
	): null | SentenceSourceInfo {
		if (sentence.bookChapter) {
			const book = sentence.bookChapter.book_public ?? sentence.bookChapter.book
			return {
				kind: 'book',
				bookName: book?.name ?? undefined,
				bookAuthor: book?.author ?? undefined,
				wholeText: sentence.bookChapter.processed_content ?? sentence.bookChapter.original_content ?? '',
			}
		}

		const video = sentence.videoPublic ?? sentence.videoPrivate
		if (video) {
			return {
				kind: 'video',
				videoName: video.name ?? undefined,
				videoYear: video.year ?? undefined,
				wholeText: video.processed_content ?? video.original_content ?? '',
			}
		}

		return null
	}

	private async fetchNeighborSentences(input: {
		sentenceId: number
		orderIndex: number
		bookChapterId: null | number
		videoPrivateId: null | number
		videoPublicId: null | number
		beforeSentences: number
		afterSentences: number
	}) {
		const parentFilter: {
			book_chapter_id?: number
			video_private_id?: number
			video_public_id?: number
		} = {}

		if (input.bookChapterId !== null) parentFilter.book_chapter_id = input.bookChapterId
		else if (input.videoPrivateId !== null) parentFilter.video_private_id = input.videoPrivateId
		else if (input.videoPublicId !== null) parentFilter.video_public_id = input.videoPublicId

		return this.prisma.sentence.findMany({
			where: {
				...parentFilter,
				id: { not: input.sentenceId },
				order_index: {
					gte: input.orderIndex - input.beforeSentences,
					lte: input.orderIndex + input.afterSentences,
				},
			},
			orderBy: { order_index: 'asc' },
			select: {
				id: true,
				order_index: true,
				start_offset: true,
				length: true,
			},
		})
	}
}
