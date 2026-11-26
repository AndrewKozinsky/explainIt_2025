import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger'
import { IsBoolean, ValidateIf } from 'class-validator'
import { GENERATE_SCENE_IMAGE, type UserPreferences } from './userPreferences'

@ApiSchema({ name: 'UserPreferences' })
export class UserPreferencesDto implements UserPreferences {
	@ApiPropertyOptional({ type: Boolean, default: true })
	@ValidateIf((_preferences, value) => value !== undefined)
	@IsBoolean()
	[GENERATE_SCENE_IMAGE]?: boolean
}
