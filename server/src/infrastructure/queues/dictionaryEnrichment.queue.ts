import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import {
	DICTIONARY_DEEP_SECTIONS_JOB_NAME,
	DictionaryEnrichmentJobData,
	WORD_SENSE_IMAGE_JOB_NAME,
} from './dictionaryEnrichment.types'
import { QueueNames } from './queueNames'

/** Постановка фоновой догенерации словарной статьи: глубокие разделы и иллюстрации значений. */
@Injectable()
export class DictionaryEnrichmentQueue {
	constructor(
		@InjectQueue(QueueNames.DICTIONARY_ENRICHMENT)
		private readonly queue: Queue<DictionaryEnrichmentJobData>,
	) {}

	async enqueueDeepSections(translationId: number): Promise<void> {
		await this.queue.add(
			DICTIONARY_DEEP_SECTIONS_JOB_NAME,
			{ translationId },
			{
				jobId: `dictionary-deep-sections-${translationId}`,
				attempts: 3,
				backoff: { type: 'exponential', delay: 30_000 },
			},
		)
	}

	/** Одна попытка: потерянный ответ платной генерации нельзя отправлять повторно автоматически. */
	async enqueueWordSenseImage(wordSenseId: number): Promise<void> {
		await this.queue.add(
			WORD_SENSE_IMAGE_JOB_NAME,
			{ wordSenseId },
			{ jobId: `word-sense-image-${wordSenseId}`, attempts: 1 },
		)
	}
}
