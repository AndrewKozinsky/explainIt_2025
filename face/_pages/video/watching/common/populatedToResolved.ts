import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
import { ResolvedSubtitlesStructure } from '_pages/video/watching/common/resolvedSubtitlesStructure'
import { ResolvedTextStructure } from '_pages/video/watching/common/resolvedTextStructure'

type TextPart =
	| PopulatedTextStructure.SentencePart
	| PopulatedSubtitlesStructure.TextPart

function textPartsToSentence(textParts: TextPart[]): string {
	return textParts
		.map((part) => {
			if (part.type === 'space') return ' '
			return part.value
		})
		.join('')
}

export function populatedPlainTextToResolved(
	populatedPlainText: PopulatedTextStructure.Structure,
): ResolvedTextStructure.Structure {
	return {
		type: 'plainText',
		sentences: populatedPlainText.sentences.map((sentence) => {
			return {
				s: textPartsToSentence(sentence.parts),
				t: sentence.translation,
			}
		}),
	}
}

export function populatedSubtitlesToResolved(
	populatedSubtitles: PopulatedSubtitlesStructure.Structure,
): ResolvedSubtitlesStructure.Structure {
	return {
		type: 'subtitles',
		subtitles: populatedSubtitles.subtitles
			.filter(
				(subtitleOrSpeechlessBar): subtitleOrSpeechlessBar is PopulatedSubtitlesStructure.Subtitle => {
					return subtitleOrSpeechlessBar.type === 'subtitle'
				},
			)
			.map((subtitle) => {
				return {
					from: subtitle.from,
					to: subtitle.to,
					ts: subtitle.texts.map((subtitleText) => {
						return {
							t: textPartsToSentence(subtitleText.textParts),
							sId: subtitleText.sentenceId,
						}
					}),
				}
			}),
		sentences: populatedSubtitles.sentences.map((sentence) => {
			return {
				id: sentence.id,
				s: textPartsToSentence(sentence.text),
				t: sentence.translation,
			}
		}),
	}
}
