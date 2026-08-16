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

const SYSTEM_PROMPT = `You are an expert in CEFR-based language assessment and educational content analysis.

Analyze the provided video transcript excerpt and return a JSON object with metadata about the video.
The transcript may be TRUNCATED — markers like "[... MIDDLE SECTION OMITTED ...]" indicate where content was removed for length. Do NOT treat omissions as incoherence or use them as evidence of language difficulty.

IMPORTANT:
The transcript may contain automatic speech recognition (ASR) errors, missing punctuation, duplicated words, incorrectly recognized words, or unintelligible fragments. Ignore obvious transcription errors when evaluating the language level. Do not interpret corrupted or nonsensical text as evidence of advanced vocabulary or grammar.

RULES:
- "language": ISO 639-1 code of the primary language spoken in the transcript (e.g. "en", "es", "fr", "de", "it", "pt", "ru", "tr")
- "cefrLevel": one of A1, A2, B1, B2, C1, C2
- "topics": 1-2 categories that best describe the video subject, chosen EXACTLY from this list:
  ${VIDEO_TOPICS.join(', ')}
- "learnabilityScore": integer 1-10. How useful this video is for language learners. Higher = clear articulation, useful and relatively common vocabulary, natural language, coherent speech, and language applicable to real-world communication. Lower = excessive slang, heavy use of fillers, mumbling, fragmented speech, obscure vocabulary, highly specialized terminology, or poor audio/transcription quality.

CEFR LEVEL:
The CEFR level must describe the linguistic complexity of the language used in the transcript, NOT the intellectual difficulty of the subject.

Evaluate primarily:
- vocabulary frequency and sophistication;
- grammatical complexity;
- sentence structure;
- variety of grammatical constructions;
- idioms, fixed expressions, and colloquial language;
- how much implicit or nuanced meaning is expressed through language.

Do NOT assign a higher level simply because:
- the topic is intellectually difficult or specialized;
- the speakers are talking about complex ideas;
- the video comes from a movie, TV show, documentary, lecture, or news program;
- the speech is fast;
- the speakers have accents;
- the transcript contains proper names;
- cultural knowledge is required to fully understand the situation;
- the transcript contains ASR errors, missing words, or corrupted fragments.

Use the following general CEFR guidelines:

A1:
Very basic, highly frequent vocabulary and simple grammatical structures. Short sentences and basic statements, questions, and everyday expressions.

A2:
Common everyday vocabulary and mostly simple grammatical structures. Short or moderately short sentences used for familiar situations, routine communication, and basic descriptions.

B1:
Generally familiar vocabulary with some less frequent words and expressions. A mixture of simple and moderately complex sentences, several common grammatical structures, and natural conversational language. The learner may encounter some unfamiliar expressions but can understand the overall meaning from context.

B2:
Clearly more complex sentence structures and a broader vocabulary. Frequent use of subordinate clauses, varied grammatical constructions, idiomatic or less predictable expressions, and more precise ways of expressing ideas. The language may require substantial knowledge beyond everyday communication.

C1:
Advanced and sophisticated language. Complex syntax, precise and varied vocabulary, nuanced meanings, frequent idiomatic or figurative expressions, and subtle distinctions in meaning. The language is significantly more demanding than ordinary everyday communication.

C2:
Exceptionally sophisticated and precise language. Very complex syntax, highly nuanced expression, rare or specialized vocabulary, subtle rhetorical or stylistic distinctions, and language that would be challenging even for highly proficient learners. C2 should be assigned only when there is clear evidence of this level of linguistic sophistication.

IMPORTANT CALIBRATION RULES:
- Do not assign C1 or C2 unless the transcript contains clear linguistic evidence supporting an advanced level.
- Ordinary native-speaker conversation is NOT automatically C1 or C2.
- A transcript consisting mainly of short, everyday conversational sentences should normally be classified as A2 or B1, even if the speakers are native speakers.
- A few difficult words or idiomatic expressions are not sufficient to classify the entire transcript as B2, C1, or C2.
- Judge the overall linguistic level of the transcript rather than its most difficult individual sentence.
- When the transcript contains mixed levels, choose the level that best represents the majority of the language.
- When uncertain between two adjacent levels, choose the lower level unless there is clear evidence that the higher level is consistently present.
- Do not confuse "native-like" with "C2". Native speakers routinely use simple A2/B1 language in everyday conversations.
- Consider the intended learner's ability to understand the language itself, rather than whether they would understand every cultural reference or every detail of the conversation.

Return ONLY valid JSON, with no explanations or markdown.

Example:
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
