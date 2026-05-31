export const GRAMMAR_CATEGORIES_BY_LANGUAGE: Record<string, string[]> = {
	en: [
		'phrasal_verb',
		'expression',
		'collocation',
		'conditional',
		'inversion',
		'gerund_vs_infinitive',
		'reported_speech',
		'other',
	],
	es: ['expression', 'collocation', 'conditional', 'subjunctive', 'ser_vs_estar', 'por_vs_para', 'other'],
	fr: ['expression', 'collocation', 'conditional', 'subjunctive', 'partitive_articles', 'other'],
	de: ['expression', 'collocation', 'separable_verbs', 'cases', 'word_order', 'modal_particles', 'other'],
	it: ['expression', 'collocation', 'conditional', 'subjunctive', 'other'],
	tr: ['expression', 'collocation', 'cases', 'agglutination', 'evidentiality', 'other'],
}
