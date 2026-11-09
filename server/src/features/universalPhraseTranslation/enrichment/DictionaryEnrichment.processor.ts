import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job, UnrecoverableError } from 'bullmq'
import {
	DICTIONARY_DEEP_SECTIONS_JOB_NAME,
	DictionaryDeepSectionsJobData,
	DictionaryEnrichmentJobData,
	WORD_SENSE_IMAGE_JOB_NAME,
	WordSenseImageJobData,
} from 'infrastructure/queues/dictionaryEnrichment.types'
import { QueueNames } from 'infrastructure/queues/queueNames'
import { GenerateDictionaryDeepSections } from './GenerateDictionaryDeepSections.service'
import { GenerateWordSenseImage } from './GenerateWordSenseImage.service'

@Processor(QueueNames.DICTIONARY_ENRICHMENT, { concurrency: 3 })
export class DictionaryEnrichmentProcessor extends WorkerHost {
	constructor(
		private readonly deepSections: GenerateDictionaryDeepSections,
		private readonly wordSenseImage: GenerateWordSenseImage,
	) {
		super()
	}

	async process(job: Job<DictionaryEnrichmentJobData>): Promise<void> {
		if (job.name === DICTIONARY_DEEP_SECTIONS_JOB_NAME) {
			await this.deepSections.generate((job.data as DictionaryDeepSectionsJobData).translationId)
			return
		}

		if (job.name === WORD_SENSE_IMAGE_JOB_NAME) {
			await this.wordSenseImage.generate((job.data as WordSenseImageJobData).wordSenseId)
			return
		}

		throw new UnrecoverableError('Invalid dictionary enrichment queue job')
	}
}
