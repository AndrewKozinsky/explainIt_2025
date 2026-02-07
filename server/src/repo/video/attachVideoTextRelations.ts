import { SentenceTranslation, SubtitleSentenceInit } from 'prisma/generated/client'

type DbSentenceLike = {
	id: number
	start_offset: number
	length: number
	order_index: number
	SentenceTranslation?: SentenceTranslation[]
}

type DbSubtitleLike = {
	id: number
	start_time_ms: number
	end_time_ms: number
	start_offset: number
	length: number
	order_index: number
	SubtitleSentenceInit?: SubtitleSentenceInit[]
}

type DbVideoWithTextRelationsLike = {
	content_type: 'text' | 'subtitles'
	Sentence?: DbSentenceLike[]
	Subtitle?: DbSubtitleLike[]
}

export function attachVideoTextRelations<TBase extends { contentType: 'text' | 'subtitles' }>(dto: {
	base: TBase
	dbVideo: DbVideoWithTextRelationsLike
}) {
	const sentences = (dto.dbVideo.Sentence ?? []).map((s) => ({
		id: s.id,
		sentenceTranslations: (s.SentenceTranslation ?? []).map((t) => ({
			id: t.id,
			translation: t.translation,
		})),
		startOffset: s.start_offset,
		length: s.length,
		orderIndex: s.order_index,
	}))

	if (dto.dbVideo.content_type !== 'subtitles') {
		return {
			...dto.base,
			sentences,
			subtitles: null,
			subtitleSentenceInit: null,
		}
	}

	const subtitles = (dto.dbVideo.Subtitle ?? []).map((s) => ({
		id: s.id,
		startTimeMs: s.start_time_ms,
		endTimeMs: s.end_time_ms,
		startOffset: s.start_offset,
		length: s.length,
		orderIndex: s.order_index,
	}))

	const subtitleSentenceInitById = new Map<number, SubtitleSentenceInit>()
	for (const subtitle of dto.dbVideo.Subtitle ?? []) {
		for (const init of subtitle.SubtitleSentenceInit ?? []) {
			subtitleSentenceInitById.set(init.id, init)
		}
	}

	const subtitleSentenceInit = Array.from(subtitleSentenceInitById.values()).map((i) => ({
		id: i.id,
		subtitleId: i.subtitle_id,
		sentenceId: i.sentence_id,
		startOffset: i.start_offset,
		length: i.length,
	}))

	return {
		...dto.base,
		sentences,
		subtitles,
		subtitleSentenceInit,
	}
}
