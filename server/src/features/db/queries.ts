import { queriesBookPublic } from 'src/features/db/queriesBookPublic'
import { queriesAI } from './queriesAI'
import { queriesAuth } from './queriesAuth'
import { queriesBook } from './queriesBook'
import { queriesBookChapter } from './queriesBookChapter'
import { queriesPayment } from './queriesPayment'

export const queries = {
	auth: queriesAuth,
	ai: queriesAI,
	payment: queriesPayment,
	book: queriesBook,
	bookPublic: queriesBookPublic,
	bookChapter: queriesBookChapter,
}
