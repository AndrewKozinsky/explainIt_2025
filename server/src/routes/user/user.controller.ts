import {
	Body,
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Patch,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { GetAvatarPresetsCommand } from 'features/user/GetAvatarPresets.command'
import { GetUserByIdCommand } from 'features/user/GetUserById.command'
import { UpdateUserProfileCommand } from 'features/user/UpdateUserProfile.command'
import { type AvatarPhotoUpload, UploadUserAvatarCommand } from 'features/user/UploadUserAvatar.command'
import { USER_AVATAR_MAX_UPLOAD_BYTES } from 'features/user/userAvatarConfig'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AvatarPresetOutModel } from 'models/user/avatarPreset.out.model'
import { UserOutModel } from 'models/user/user.out.model'
import { UpdateUserProfileDto } from './dto/updateUserProfile.dto'
import { ApiGetAvatarPresets, ApiGetMe, ApiUpdateMe, ApiUploadAvatar } from './openAPI.decorators'
import type { Request } from 'express'

@ApiTags('User')
@Controller('user')
@UseGuards(CheckSessionCookieGuard)
export class UserController {
	constructor(private readonly commandBus: CommandBus) {}

	@ApiGetMe()
	@Header('Cache-Control', 'private, no-store')
	@Get('me')
	getMe(@Req() request: Request): Promise<UserOutModel> {
		return this.commandBus.execute(new GetUserByIdCommand(request.session.userId!))
	}

	@ApiGetAvatarPresets()
	@Header('Cache-Control', 'private, no-store')
	@Get('avatar-presets')
	getAvatarPresets(): Promise<AvatarPresetOutModel[]> {
		return this.commandBus.execute(new GetAvatarPresetsCommand())
	}

	@ApiUpdateMe()
	@Header('Cache-Control', 'private, no-store')
	@Patch('me')
	updateMe(@Body() input: UpdateUserProfileDto, @Req() request: Request): Promise<UserOutModel> {
		return this.commandBus.execute(new UpdateUserProfileCommand(request.session.userId!, input))
	}

	@ApiUploadAvatar()
	@Header('Cache-Control', 'private, no-store')
	@HttpCode(HttpStatus.OK)
	@Post('me/avatar')
	@UseInterceptors(
		FileInterceptor('file', {
			limits: { fileSize: USER_AVATAR_MAX_UPLOAD_BYTES, files: 1, fields: 0, parts: 2 },
		}),
	)
	uploadAvatar(@UploadedFile() photo: AvatarPhotoUpload | undefined, @Req() request: Request): Promise<UserOutModel> {
		return this.commandBus.execute(new UploadUserAvatarCommand(request.session.userId!, photo))
	}
}
