import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CleanupUserAvatars } from 'features/user/CleanupUserAvatars.service'
import { GetAvatarPresetsHandler } from 'features/user/GetAvatarPresets.command'
import { GetUserByIdHandler } from 'features/user/GetUserById.command'
import { UpdateUserProfileHandler } from 'features/user/UpdateUserProfile.command'
import { UploadUserAvatarHandler } from 'features/user/UploadUserAvatar.command'
import { CloudflareS3Module } from 'infrastructure/cloudflareS3/cloudflareS3.module'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { ImageProcessingModule } from 'infrastructure/imageProcessing/imageProcessing.module'
import { UserController } from './user.controller'

@Module({
	imports: [CqrsModule, CloudflareS3Module, ImageProcessingModule],
	controllers: [UserController],
	providers: [
		PrismaService,
		UserRepository,
		UserQueryRepository,
		CheckSessionCookieGuard,
		GetUserByIdHandler,
		GetAvatarPresetsHandler,
		UpdateUserProfileHandler,
		UploadUserAvatarHandler,
		CleanupUserAvatars,
	],
})
export class UserModule {}
