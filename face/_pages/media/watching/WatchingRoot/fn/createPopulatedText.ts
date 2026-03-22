import { VideoPrivateOutModel, VideoPublicOutModel } from '@/graphql'
import { getSentenceStructure } from '_pages/media/commonComponents/functions/getSentenceStructure'
import { PopulatedSubtitlesStructure } from '../../common/populatedSubtitlesStructure'

export function createPopulatedSubtitles(
	videoData: VideoPrivateOutModel | VideoPublicOutModel,
): PopulatedSubtitlesStructure.Structure {
	if (
		!videoData.processedContent ||
		!videoData.sentences ||
		!videoData.subtitles ||
		!videoData.subtitleSentenceInit
	) {
		return {
			subtitles: [],
			sentences: [],
			playingSubtitleOrSpeechlessBarId: 0,
		}
	}

	const text = videoData.processedContent
	const sentencesSorted = [...videoData.sentences].sort((a, b) => a.orderIndex - b.orderIndex)
	const subtitlesSorted = [...videoData.subtitles].sort((a, b) => a.orderIndex - b.orderIndex)

	const sentences: PopulatedSubtitlesStructure.Structure['sentences'] = sentencesSorted.map((s) => {
		const start = Math.max(0, Math.min(text.length, s.startOffset))
		const end = Math.max(start, Math.min(text.length, s.startOffset + s.length))

		return {
			id: s.id,
			text: text.slice(start, end),
		}
	})

	type InitItem = NonNullable<(VideoPrivateOutModel | VideoPublicOutModel)['subtitleSentenceInit']>[number]

	const initBySubtitleId = new Map<number, InitItem[]>()
	for (const init of videoData.subtitleSentenceInit) {
		const arr = initBySubtitleId.get(init.subtitleId) ?? []
		arr.push(init)
		initBySubtitleId.set(init.subtitleId, arr)
	}

	const subtitles: PopulatedSubtitlesStructure.Structure['subtitles'] = []
	let speechlessBarId = 10_000_000
	let prevEndMs = 0
	const wordOffsetBySentenceId = new Map<number, number>()

	for (const subtitle of subtitlesSorted) {
		const fromMs = subtitle.startTimeMs
		const toMs = subtitle.endTimeMs

		if (fromMs > prevEndMs) {
			subtitles.push({
				type: 'speechlessBar',
				id: speechlessBarId++,
				fromSeconds: prevEndMs / 1000,
				toSeconds: fromMs / 1000,
			})
		}

		const initItems = [...(initBySubtitleId.get(subtitle.id) ?? [])].sort((a, b) => a.startOffset - b.startOffset)
		const texts: PopulatedSubtitlesStructure.Subtitle['texts'] = []
		let lastEnd = -1

		for (const init of initItems) {
			const start = Math.max(0, Math.min(text.length, init.startOffset))
			const end = Math.max(start, Math.min(text.length, init.startOffset + init.length))
			const fragment = text.slice(start, end)
			const currentWordOffset = wordOffsetBySentenceId.get(init.sentenceId) ?? 0

			const prev = texts[texts.length - 1]
			if (prev && prev.sentenceId === init.sentenceId && start <= lastEnd) {
				prev.text += fragment
			} else if (prev && prev.sentenceId === init.sentenceId && start === lastEnd) {
				prev.text += fragment
			} else {
				texts.push({ text: fragment, sentenceId: init.sentenceId, wordOffset: currentWordOffset })
			}

			wordOffsetBySentenceId.set(init.sentenceId, currentWordOffset + countWords(fragment))

			lastEnd = Math.max(lastEnd, end)
		}

		subtitles.push({
			type: 'subtitle',
			id: subtitle.id,
			from: msToTimeCode(fromMs),
			fromSeconds: fromMs / 1000,
			to: msToTimeCode(toMs),
			toSeconds: toMs / 1000,
			texts,
		})

		prevEndMs = Math.max(prevEndMs, toMs)
	}

	return {
		subtitles,
		sentences,
		playingSubtitleOrSpeechlessBarId: 0,
	}
}

function msToTimeCode(ms: number): string {
	const total = Math.max(0, Math.floor(ms))
	const hours = Math.floor(total / 3_600_000)
	const minutes = Math.floor((total % 3_600_000) / 60_000)
	const seconds = Math.floor((total % 60_000) / 1_000)
	const millis = total % 1_000

	const hh = String(hours).padStart(2, '0')
	const mm = String(minutes).padStart(2, '0')
	const ss = String(seconds).padStart(2, '0')
	const mmm = String(millis).padStart(3, '0')

	return `${hh}:${mm}:${ss},${mmm}`
}

function countWords(text: string): number {
	return getSentenceStructure(text).filter((p) => p.isWord).length
}
