import { Language, languages } from 'utils/languages'
import { WORD_KINDS, WordKind } from './dictionaryArticleConfig'

export type KnownWordSense = { id: number; lemma: string; gloss: string; picture: null | string }

type BuildUniversalPhraseTranslationPromptInput = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	phrase: string
	kind: WordKind
	lemmas: string[]
	knownSenses: KnownWordSense[]
}

function buildWordKindAdvice(targetLanguage: string): Record<WordKind, string> {
	return {
		lexical: `A content word. List the meanings a learner can realistically meet in books, films and conversation, most common first, one sense block each, as many as that takes. Leave out historical, archaic and narrow specialist meanings unless that is what the word is mainly used for. Merge meanings that share a translation and usage instead of splitting hairs.
Write an opening text only if knowing the translation would still leave the reader misusing or misunderstanding the word: the ${targetLanguage} word covers a different range, has a different feeling, is a false friend, or no equivalent exists.
Example without an opening: "doctor" needs only the sense "врач" and its examples. Do NOT write "Doctor — это врач: человек, который лечит людей".
Example with an opening: "cosy" is warm, safe, small and pleasant all at once, and one word rarely carries all of that, so one or two sentences about that feeling are worth writing.`,
		inflected:
			'A form of another word. Say in one short line what form it is and of which word. Translate it in THAT form ("wrote" is "написал", not "писать"). Every example must contain this exact form. If the form also has a meaning of its own, or could be another word, add a sense for that too.',
		functional: `A grammatical word. It often has no single translation, so name each use by its ${targetLanguage} equivalent or by what it does ("from" as "из", "от", "с"). A short rule is welcome when a use has no equivalent. Show the pattern through examples rather than description.`,
		idiom: `A fixed expression. Give what it means. If its wording paints a picture different from its meaning, start the sense with one text block giving the word-for-word translation, introduced by the ${targetLanguage} word for "Literally" (for "spill the beans": "Дословно: рассыпать бобы"). Skip that line when the wording is transparent ("pretty much" reads almost word for word). Say how it sounds (rude, jokey, bookish) if that affects when it can be used. A phrasal verb can have several senses.`,
		proper: `A name. One or two sentences: how it is written in ${targetLanguage} and what it is. No examples, no etymology, no list of famous bearers. Do not add a visual.`,
		free: 'An ordinary combination with no meaning beyond its parts. Give the translation. Add a short remark only about a part that is really not obvious. No examples, no visual.',
		sentence:
			'A whole sentence. Give the translation. Add a short remark only if something in it would not be understood from the translation. No visual.',
		other: 'Decide for yourself how best to tell about it.',
	}
}

/**
 * Строит промпт основной части статьи.
 * Тип слова — только подсказка: модель сама решает, как лучше рассказать о слове.
 */
export function buildUniversalPhraseTranslationPrompt(input: BuildUniversalPhraseTranslationPromptInput): string {
	const source = languages[input.sourceLanguageCode].nameEng
	const target = languages[input.targetLanguageCode].nameEng

	const { phrase, kind, lemmas, knownSenses } = input
	const allAdvice = buildWordKindAdvice(target)

	const advice =
		kind === 'other'
			? `First work out what kind of thing "${phrase}" is, then follow the matching advice.\n\n${WORD_KINDS.map((wordKind) => `If it is ${wordKind}: ${allAdvice[wordKind]}`).join('\n\n')}`
			: `This looks like: ${kind}${lemmas.length > 0 ? ` (dictionary headwords: ${lemmas.join(', ')})` : ''}. This is a hint, not a cage: if the text needs a different shape, use it.\n\n${allAdvice[kind]}`

	const knownSensesText =
		knownSenses.length > 0
			? `\nThe dictionary already knows these senses of the headwords. When your sense has the same meaning, set "senseRef" to its id; otherwise null. A sense with "senseRef" reuses the existing picture described in "picture": its first example must describe exactly that situation.\n${JSON.stringify(knownSenses)}\n`
			: ''

	return `You write the main part of a dictionary entry about the ${source} word or phrase "${phrase}" for a native ${target} speaker. The entry describes the word in general and is not tied to any text.

THE ONE RULE: every sentence must teach something the reader would not already get from the translation. When the translation is enough, stop at the translation. Never define a word whose ${target} equivalent means the same thing.

Do not write sections about similar words, common mistakes, derived words or etymology: those are written separately.
Never mention pronunciation or transcription. Never list inflected forms such as "bring, brought, brought": a separate block shows them.

LANGUAGE: write all headers, explanations and "translation" fields in ${target}. Use ${source} only in "sentence" fields and when quoting ${source} words.

${advice}
${knownSensesText}
Return only a JSON object. If "${phrase}" does not exist in ${source} return {"nonExistentWord": true}. Otherwise return {"blocks": [...]}.
You are free to arrange the blocks however best tells about this word. Available blocks:

{"type":"text","text":"Markdown text"}
{"type":"example","sentence":"${source} sentence","translation":"${target} translation"}
{"type":"block","header":"Section title","children":[...any blocks...]}
{"type":"sense","header":"the ${target} translation or translations, nothing else","lemma":"headword this sense belongs to","gloss":"short plain English description of this meaning","senseRef":null,"children":[...any blocks, usually just examples...],"visual":null}

"sense" is one meaning of the word. Add a text block inside it only when the translation alone would mislead.
In "header" separate translations with commas only when they are really different words ("водитель, шофёр"). Never list grammatical variants of one word: both aspects of a verb ("покупать, купить"), masculine and feminine forms, singular and plural. Give one of them, the ordinary dictionary form. For a verb in a language with aspects that is the imperfective, unless this meaning is really used in the perfective ("buy time" is "выиграть"). A looked-up inflected form is still translated in that form ("wrote" is "написал").
No two senses of an entry may have the same "header". If the ${target} word carries the meaning the same way the ${source} word does, make one sense and show the uses in its examples ("windows" of a house and on a computer screen are one sense "окна"). If the translation only happens to coincide and the meanings are really different, add a clarification of one or two words in parentheses to each of those headers: "драйвер (программа)" and "драйвер (клюшка для гольфа)", "принимать (лекарство)" and "принимать (решение)". Use parentheses only for such headers.
Give each sense two examples that differ in situation or construction, so the reader sees the word at work in different contexts. One example is enough only for a rare sense.
In every example wrap in **double asterisks** the looked-up word or expression in "sentence", in the form it has there, and in "translation" the words that translate it ("The **driver** stopped the bus." / "**Водитель** остановил автобус."). Mark nothing else in examples.

"visual" is null by default. The picture also serves as a flashcard: it is shown alone, with no word, translation or example, and the learner must name the word from it. So a sense gets a picture only if it passes this test:
THE PICTURE TEST: exactly one element of the picture is orange-red, the rest is grey. Imagine showing the finished picture alone to ten ordinary people and asking "what is the orange thing, in one word?". At least nine must answer with this sense's translation or a close synonym, not with some other word. If you have any doubt, the test is failed and "visual" is null. A missing picture costs nothing; a picture that names the wrong word does harm.
Passes: "apple" (an apple), "bridge" (a bridge), "umbrella", "jump" (a figure in mid-jump), "cry" (a crying figure), "driver" (an orange figure at the wheel of a grey bus: the grey surroundings tell who the figure is).
Fails: "steady" (people say "ladder"), "uncanny" (people say "doll"), "client" (people say "man" or "two people"), "bring" (people say "carry a box"), "give up" (a person near a jar says nothing definite), "kick the bucket" (a literal drawing names the wrong thing, and the real meaning has no picture).
Most adjectives, adverbs, abstract nouns, grammar words, idioms and verbs without one unmistakable visible action fail. Never make up a situation just to have something to draw: the picture must show the meaning itself, and must not depend on a sentence to be understood.

Format of a visual that passed:
{"kind":"scene|contrast|comic","prompt":"what is drawn, in English, at most 40 words"}
- "scene": a wide 8:5 picture of one object or action in its most typical and recognizable form. Grey surroundings are allowed only when they are needed to recognize the orange element.
- "contrast": a wide 8:5 picture of two things side by side, used only when the orange one can be named by this word and by nothing else.
- "comic": three frames in a row, used only when the change itself is what people would name (melting ice). Each frame must look clearly different from the others.
Design the picture from the meaning alone. The first example is then shown under it, so it must not contradict the picture: it is about the same object or action, in a natural sentence someone would really say or read, never a description of the drawing ("This bicycle is red").
Say which element carries the meaning: it will be painted orange-red. That element must be an object, a gesture or a whole figure, never just a face or skin.
A sense with a "senseRef" already has its picture or its decision, so its "visual" is null. Never show text, letters or numbers in the picture.`
}
