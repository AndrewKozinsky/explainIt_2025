import { Logger } from '@nestjs/common'
import { DEFAULT_FLASH_AI_MODEL } from 'types/AIModels'
import { VIDEO_TOPICS } from 'utils/videoTopics'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { SubtitlesService } from 'infrastructure/subtitles/SubtitlesService'

// ─── Types ────────────────────────────────────────────────────────────────────

export type VideoMetadata = {
	proficiencyLevel: number // 1-6 (A1=1 … C2=6)
	topic: string // одна из TOPICS
	learnabilityScore: number // 1-10
}

type LlmAnalysisResult = {
	language: string
	cefrLevel: string
	topics: string[]
	learnabilityScore: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CEFR_TO_NUMBER: Record<string, number> = {
	A1: 1,
	A2: 2,
	B1: 3,
	B2: 4,
	C1: 5,
	C2: 6,
}

const SYSTEM_PROMPT = `You are an expert in educational content analysis for language learners. Analyze the provided video transcript excerpt and return a JSON object with metadata about the video.

The transcript may be TRUNCATED — markers like "[... MIDDLE SECTION OMITTED ...]" indicate where content was removed for length. Do NOT treat omissions as incoherence; evaluate based on the available text.

RULES:
- "language": ISO 639-1 code of the language spoken (e.g. "en", "es", "fr", "de", "it", "tr", "ru")
- "cefrLevel": one of A1, A2, B1, B2, C1, C2 — the language proficiency level required to comfortably understand this content
- "topics": 1-2 categories that best describe the video subject, chosen EXACTLY from this list:
  ${VIDEO_TOPICS.join(', ')}
- "learnabilityScore": integer 1-10. How useful this video is for language learners. Higher = clear articulation, structured thoughts, useful frequent vocabulary, real-world applicable language. Lower = excessive slang, filler words, rambling, outdated/obscure language, poorly structured sentences.

Return ONLY valid JSON, no explanations:
{"language":"en","cefrLevel":"B1","topics":["Technology & Science"],"learnabilityScore":7}`

const MAX_SAMPLE_CHARS = 3000

// ─── Public API ───────────────────────────────────────────────────────────────

const logger = new Logger('analyzeVideoMetadata')

/**
 * Analyze video subtitle text via LLM and extract metadata:
 * proficiency level, topic category, learnability score, and summary.
 *
 * Returns `null` if the input is unparseable, empty, or the LLM call fails.
 * Never throws — all errors are caught and logged.
 */
export async function analyzeVideoMetadata(
	llmAdapter: LlmAdapterService,
	srtContent: string,
	subtitlesService: SubtitlesService,
): Promise<VideoMetadata | null> {
	// 1. Parse SRT → plain text
	const cues = subtitlesService.stringToSrtStructure(srtContent)
	if (!cues) {
		logger.warn('Cannot parse SRT content for metadata analysis')
		return null
	}

	const { plainText } = subtitlesService.cuesToPlainText(cues)
	if (!plainText) {
		logger.warn('Empty plain text after SRT parsing, skipping metadata analysis')
		return null
	}

	// 2. Truncate for LLM
	const sample = extractTextSample(plainText, MAX_SAMPLE_CHARS)

	// 3. Call LLM
	let rawJson: string
	try {
		const result = await llmAdapter.generate({
			model: DEFAULT_FLASH_AI_MODEL,
			responseFormat: 'json_object',
			messages: [
				{ role: 'system', content: SYSTEM_PROMPT },
				{ role: 'user', content: sample },
			],
		})
		rawJson = result.content
		logger.log(`Metadata analysis done (input=${result.inputTokens} tokens, output=${result.outputTokens} tokens)`)
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		logger.warn(`LLM call failed for metadata analysis: ${message}`)
		return null
	}

	// 4. Parse LLM response
	let parsed: LlmAnalysisResult
	try {
		parsed = JSON.parse(rawJson) as LlmAnalysisResult
	} catch {
		logger.warn(`Cannot parse LLM JSON response for metadata analysis: ${rawJson.slice(0, 200)}`)
		return null
	}

	// 5. Validate and map
	const proficiencyLevel = CEFR_TO_NUMBER[parsed.cefrLevel]
	if (proficiencyLevel === undefined) {
		logger.warn(`Unknown CEFR level from LLM: "${parsed.cefrLevel}", skipping metadata`)
		return null
	}

	const learnabilityScore = clampScore(parsed.learnabilityScore, 1, 10)

	const topic = pickValidTopic(parsed.topics)
	if (!topic) {
		logger.warn(`No valid topic from LLM response: ${JSON.stringify(parsed.topics)}, skipping metadata`)
		return null
	}

	return {
		proficiencyLevel,
		topic,
		learnabilityScore,
	}
}

// ─── Private helpers ──────────────────────────────────────────────────────────

/**
 * Extract a representative text sample from a long transcript using
 * stratified sampling: beginning + middle + end.
 *
 * Inserts markers so the LLM knows where content was omitted.
 */
function extractTextSample(fullText: string, maxChars: number): string {
	if (fullText.length <= maxChars) return fullText

	const sectionSize = Math.floor(maxChars / 3)
	const textThird = Math.floor(fullText.length / 3)

	const beginning = fullText.slice(0, textThird).slice(-sectionSize)
	const middle = fullText.slice(textThird, textThird * 2).slice(0, sectionSize)
	const end = fullText.slice(-textThird).slice(0, sectionSize)

	const totalWords = fullText.split(/\s+/).length

	return [
		`[EXCERPT FROM FULL TRANSCRIPT (~${totalWords} words total). Below are samples from the beginning, middle, and end.]`,
		'',
		'[BEGINNING OF TRANSCRIPT:]',
		beginning,
		'',
		'[... MIDDLE SECTION OMITTED ...]',
		'',
		'[MIDDLE OF TRANSCRIPT:]',
		middle,
		'',
		'[... END SECTION OMITTED ...]',
		'',
		'[ENDING OF TRANSCRIPT:]',
		end,
	].join('\n')
}

function clampScore(value: unknown, min: number, max: number): number {
	const num = typeof value === 'number' ? value : Number(value)
	if (!Number.isFinite(num)) return min

	return Math.max(min, Math.min(max, Math.round(num)))
}

function pickValidTopic(topics: unknown): string | null {
	if (!Array.isArray(topics) || topics.length === 0) return null

	for (const t of topics) {
		if (typeof t === 'string' && (VIDEO_TOPICS as readonly string[]).includes(t)) {
			return t
		}
	}

	return null
}
