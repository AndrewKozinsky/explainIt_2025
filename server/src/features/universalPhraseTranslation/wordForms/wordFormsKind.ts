/** Вид строки форм: от него зависит подпись блока на клиенте. */
export const WORD_FORMS_KINDS = ['irregularVerb', 'plural', 'comparison', 'stemChange'] as const
export type WordFormsKind = (typeof WORD_FORMS_KINDS)[number]
