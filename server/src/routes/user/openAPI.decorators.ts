import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { AvatarPresetOutModel } from 'models/user/avatarPreset.out.model'
import { UserOutModel } from 'models/user/user.out.model'
import { UpdateUserProfileDto } from './dto/updateUserProfile.dto'

const avatarUploadSchema = {
	type: 'object' as const,
	required: ['file'],
	properties: {
		file: {
			description: bdConfig.User.dtoProps.avatarFile.description,
			type: 'string' as const,
			format: 'binary',
		},
	},
}

export function ApiGetMe() {
	return applyDecorators(
		ApiOperation({ summary: 'Get current user' }),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}

export function ApiGetAvatarPresets() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get shared avatar presets',
			description: 'Prepared avatars available to every user.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: [AvatarPresetOutModel] }),
	)
}

export function ApiUpdateMe() {
	return applyDecorators(
		ApiOperation({
			summary: 'Update current user profile',
			description:
				'Provide gender, avatarPresetId, or a preferences patch. Preferences are merged by key. Preset gender takes precedence; avatarPresetId: null selects an existing saved photo.',
		}),
		ApiCookieAuth(),
		ApiBody({ type: UpdateUserProfileDto }),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}

export function ApiUploadAvatar() {
	return applyDecorators(
		ApiOperation({
			summary: 'Upload current user avatar',
			description: 'Photo is resized without cropping. The active avatar selection is preserved.',
		}),
		ApiCookieAuth(),
		ApiConsumes('multipart/form-data'),
		ApiBody({ schema: avatarUploadSchema }),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}

export function ApiDeleteAvatar() {
	return applyDecorators(
		ApiOperation({
			summary: 'Delete current user avatar photo',
			description: 'Deleting the active photo selects the default preset for the current gender.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}
