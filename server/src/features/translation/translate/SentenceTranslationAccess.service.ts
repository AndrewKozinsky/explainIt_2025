import { Injectable } from '@nestjs/common'
import { SentenceRepository } from 'repo/sentence.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CurrentSubscriptionServiceModel } from 'models/auth/auth.service.model'

export type SentenceTranslationAccessMode = 'dailyLimit' | 'forbidden' | 'subscriptionBalance' | 'unlimited'

type SentenceTranslationDeniedReason =
	| 'anonymousNonFreeToUse'
	| 'privateTranslationRequiresStandardBalance'
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
		currentSubscription: null | CurrentSubscriptionServiceModel
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
				currentSubscription: input.currentSubscription,
				isFreeToUse: Boolean(sentenceDb.bookChapter?.book_public?.free_to_use || sentenceDb.videoPublic?.free_to_use),
			})
		}

		return await this.resolvePrivateMaterialAccess({
			userId: input.userId,
			currentSubscription: input.currentSubscription,
			privateBookOwnerId: sentenceDb.bookChapter?.book?.user_id ?? null,
			privateVideoOwnerId: sentenceDb.videoPrivate?.user_id ?? null,
		})
	}

	private async resolvePublicMaterialAccess(input: {
		userId: null | number
		currentSubscription: null | CurrentSubscriptionServiceModel
		isFreeToUse: boolean
	}): Promise<SentenceTranslationAccess> {
		if (input.isFreeToUse) {
			return this.createUnlimitedAccess()
		}

		if (!input.userId) {
			return this.createForbiddenAccess('anonymousNonFreeToUse')
		}

		if (!input.currentSubscription) {
			return {
				readMode: 'dailyLimit',
				createMode: 'dailyLimit',
			}
		}

		return this.createUnlimitedAccess()
	}

	private async resolvePrivateMaterialAccess(input: {
		userId: null | number
		currentSubscription: null | CurrentSubscriptionServiceModel
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

		if (
			!input.currentSubscription ||
			!this.isStandardSubscription(input.currentSubscription) ||
			input.currentSubscription.balance < 10
		) {
			return {
				readMode: 'unlimited',
				createMode: 'forbidden',
				createDeniedReason: 'privateTranslationRequiresStandardBalance',
			}
		}

		return {
			readMode: 'unlimited',
			createMode: 'subscriptionBalance',
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

	private isStandardSubscription(currentSubscription: CurrentSubscriptionServiceModel) {
		return currentSubscription.includedBalance > 0
	}
}
