import { GRAMMAR_CATEGORIES_BY_LANGUAGE } from './grammarCategories'

type PromptTemplates = Record<string, { system: string; rules: string }>

const PROMPTS: PromptTemplates = {
	en: {
		system: 'You are a linguist. Extract all grammar constructs from the given English sentence.',
		rules: `
Rules for lemma normalization:
- phrasal_verb: infinitive without "to" + particles, lowercase, e.g. "come up", "look forward to"
- expression: dictionary form lowercase, e.g. "make a difference", "i don't mind"
- collocation: base form lowercase, e.g. "depend on", "good at"
- conditional: one of: zero, first, second, third, mixed
- inversion: base form lowercase, e.g. "never have i seen", "hardly had he"
- gerund_vs_infinitive: lowercase, e.g. "stop to do vs stop doing"
- reported_speech: lowercase description, e.g. "backshift of tenses"
- other: short lowercase description

If no grammar constructs found, return empty items.
If a construct doesn't fit any category, use "other". Do not force it into a close category.`,
	},
	es: {
		system: 'Eres un lingüista. Extrae todas las construcciones gramaticales de la siguiente oración en español.',
		rules: `
Reglas para la normalización de lemas:
- expression: forma de diccionario en minúsculas, e.g. "tener que ver", "dar igual"
- collocation: forma base en minúsculas, e.g. "depender de", "soñar con"
- conditional: uno de: zero, first, second, third, mixed
- subjunctive: tipo en minúsculas, e.g. "presente", "imperfecto", "pluscuamperfecto"
- ser_vs_estar: descripción en minúsculas, e.g. "ser permanente", "estar temporal"
- por_vs_para: descripción en minúsculas, e.g. "por causa", "para finalidad"
- other: descripción corta en minúsculas

Si no hay construcciones gramaticales, devuelve items vacío.
Si una construcción no encaja en ninguna categoría, usa "other". No la fuerces.`,
	},
	fr: {
		system: 'Tu es linguiste. Extrais toutes les constructions grammaticales de la phrase française donnée.',
		rules: `
Règles de normalisation des lemmes:
- expression: forme du dictionnaire en minuscules, e.g. "avoir beau", "il y a"
- collocation: forme de base en minuscules, e.g. "dépendre de", "s'intéresser à"
- conditional: un de: zero, first, second, third, mixed
- subjunctive: type en minuscules, e.g. "présent", "passé", "imparfait"
- partitive_articles: description en minuscules, e.g. "du", "de la", "des"
- other: description courte en minuscules

S'il n'y a pas de constructions grammaticales, renvoie un items vide.
Si une construction ne correspond à aucune catégorie, utilise "other". Ne force pas.`,
	},
	de: {
		system: 'Du bist Linguist. Extrahiere alle grammatikalischen Konstruktionen aus dem gegebenen deutschen Satz.',
		rules: `
Regeln zur Lemma-Normalisierung:
- expression: Wörterbuchform klein, z.B. "es geht um", "im großen und ganzen"
- collocation: Grundform klein, z.B. "sich interessieren für", "abhängig von"
- separable_verbs: Infinitiv klein, z.B. "aufmachen", "mitkommen"
- cases: Beschreibung klein, z.B. "dativ", "akkusativ", "genitiv"
- word_order: Beschreibung klein, z.B. "nebensatz", "inversion", "verb am ende"
- modal_particles: Partikel klein, z.B. "doch", "mal", "ja", "eben"
- other: kurze Beschreibung klein

Wenn keine grammatikalischen Konstruktionen gefunden werden, gib leere items zurück.
Wenn eine Konstruktion in keine Kategorie passt, verwende "other". Nicht erzwingen.`,
	},
	it: {
		system: 'Sei un linguista. Estrai tutte le costruzioni grammaticali dalla seguente frase italiana.',
		rules: `
Regole per la normalizzazione dei lemmi:
- expression: forma del dizionario in minuscolo, e.g. "avere a che fare", "non vedo l'ora"
- collocation: forma base in minuscolo, e.g. "dipendere da", "interessarsi a"
- conditional: uno di: zero, first, second, third, mixed
- subjunctive: tipo in minuscolo, e.g. "presente", "imperfetto", "trapassato"
- other: breve descrizione in minuscolo

Se non ci sono costruzioni grammaticali, restituisci items vuoto.
Se una costruzione non rientra in nessuna categoria, usa "other". Non forzare.`,
	},
	tr: {
		system: 'Sen bir dilbilimcisin. Verilen Türkçe cümledeki tüm dilbilgisi yapılarını çıkar.',
		rules: `
Lemma normalleştirme kuralları:
- expression: sözlük formu küçük harf, örn. "hoş geldin", "ne yapıyorsun"
- collocation: temel form küçük harf, örn. "karar vermek", "yardım etmek"
- cases: durum açıklaması küçük harf, örn. "belirtme", "yönelme", "bulunma", "ayrılma"
- agglutination: ek açıklaması küçük harf, örn. "-ebil", "-meli", "-yor"
- evidentiality: biçim küçük harf, örn. "-miş", "-dı", "-mış gibi"
- other: kısa açıklama küçük harf

Dilbilgisi yapısı bulunamazsa boş items döndür.
Bir yapı hiçbir kategoriye uymuyorsa "other" kullan. Zorlama.`,
	},
}

export function buildGrammarExtractionPrompt(
	sentenceText: string,
	sourceLanguageCode: string,
): {
	systemPrompt: string
	userPrompt: string
} {
	const categories = GRAMMAR_CATEGORIES_BY_LANGUAGE[sourceLanguageCode]
	if (!categories) {
		throw new Error(`Unsupported source language for grammar extraction: ${sourceLanguageCode}`)
	}

	const templates = PROMPTS[sourceLanguageCode] ?? PROMPTS.en

	const systemPrompt = [
		templates.system,
		'',
		`Categories: ${categories.join(', ')}.`,
		templates.rules,
		'',
		'Return ONLY a JSON object (no markdown, no explanation):',
		'{ "items": [{ "category": "<category>", "lemma": "<normalized form>" }] }',
	].join('\n')

	const userPrompt = `Sentence: "${sentenceText}"`

	return { systemPrompt, userPrompt }
}
