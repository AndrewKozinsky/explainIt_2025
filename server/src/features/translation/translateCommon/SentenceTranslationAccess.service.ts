import { Injectable } from '@nestjs/common'
import { SentenceRepository } from 'repo/sentence.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export type SentenceTranslationAccessMode = 'forbidden' | 'chargeBalance' | 'unlimited'

type SentenceTranslationDeniedReason =
	| 'anonymousNonFreeToUse'
	| 'userIsNotOwner'

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
			throw new CustomGraphQLError(errorMessage.sentence.notFound, ErrorCode.NotFound_404)
		}

		const isPublicBook = Boolean(sentenceDb.bookChapter?.book_public_id)
		const isPublicVideo = Boolean(sentenceDb.video_public_id)
		const isPublicMaterial = isPublicBook || isPublicVideo

		if (isPublicMaterial) {
			return this.resolvePublicMaterialAccess({
				userId: input.userId,
				isFreeToUse: Boolean(sentenceDb.bookChapter?.book_public?.free_to_use || sentenceDb.videoPublic?.free_to_use),
			})
		}

		return await this.resolvePrivateMaterialAccess({
			userId: input.userId,
			privateBookOwnerId: sentenceDb.bookChapter?.book?.user_id ?? null,
			privateVideoOwnerId: sentenceDb.videoPrivate?.user_id ?? null,
		})
	}

	private async resolvePublicMaterialAccess(input: {
		userId: null | number
		isFreeToUse: boolean
	}): Promise<SentenceTranslationAccess> {
		if (input.isFreeToUse) {
			return this.createUnlimitedAccess()
		}

		if (!input.userId) {
			return this.createForbiddenAccess('anonymousNonFreeToUse')
		}

		return {
			readMode: 'unlimited',
			createMode: 'chargeBalance',
		}
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
