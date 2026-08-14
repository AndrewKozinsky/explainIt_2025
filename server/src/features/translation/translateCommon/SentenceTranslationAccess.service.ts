import { Injectable } from '@nestjs/common'
import { SentenceRepository } from 'repo/sentence.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export type SentenceTranslationAccessMode = 'forbidden' | 'chargeBalance' | 'unlimited'

type SentenceTranslationDeniedReason = 'anonymousNonFreeToUse' | 'userIsNotOwner'

export type SentenceTranslationAccess = {
	readMode: SentenceTranslationAccessMode
	createMode: SentenceTranslationAccessMode
	readDeniedReason?: SentenceTranslationDeniedReason
	createDeniedReason?: SentenceTranslationDeniedReason
}

@Injectable()
export class SentenceTranslationAccessService {
	constructor(private sentenceRepository: SentenceRepository) {}

	async resolveAccessOrThrow(input: {
		userId: null | number
		sentenceId: number
	}): Promise<SentenceTranslationAccess> {
		const sentenceDb = await this.sentenceRepository.getSentenceDbById(input.sentenceId)
		if (!sentenceDb) {
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		const isPublicBook = sentenceDb.bookChapter?.book?.type === 'public'
		const isPublicVideo = Boolean(sentenceDb.video_id)
		const isPublicMaterial = isPublicBook || isPublicVideo

		if (isPublicMaterial) {
			return this.resolvePublicMaterialAccess()
		}

		return await this.resolvePrivateMaterialAccess({
			userId: input.userId,
			privateBookOwnerId: sentenceDb.bookChapter?.book?.user_id ?? null,
			privateVideoOwnerId: sentenceDb.video?.user_id ?? null,
		})
	}

	private async resolvePublicMaterialAccess(): Promise<SentenceTranslationAccess> {
		return this.createUnlimitedAccess()
	}

	private async resolvePrivateMaterialAccess(input: {
		userId: null | number
		privateBookOwnerId: null | number
		privateVideoOwnerId: null | number
	}): Promise<SentenceTranslationAccess> {
		if (!input.userId) {
			return this.createForbiddenAccess('anonymousNonFreeToUse')
		}

		const isOwner = input.privateBookOwnerId === input.userId || input.privateVideoOwnerId === input.userId

		if (!isOwner) {
			return this.createForbiddenAccess('userIsNotOwner')
		}

		return {
			readMode: 'unlimited',
			createMode: 'chargeBalance',
		}
	}

	private createUnlimitedAccess(): SentenceTranslationAccess {
		return {
			readMode: 'unlimited',
			createMode: 'unlimited',
		}
	}

	private createForbiddenAccess(reason: SentenceTranslationDeniedReason): SentenceTranslationAccess {
		return {
			readMode: 'forbidden',
			createMode: 'forbidden',
			readDeniedReason: reason,
			createDeniedReason: reason,
		}
	}
}
