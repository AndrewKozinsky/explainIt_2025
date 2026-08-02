import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEmail,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
	Matches,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { Trim } from 'infrastructure/pipes/Trim.decorator'
import { BdConfig } from './dbConfig/dbConfigType'

/**
 * Creates universal decorator to check property in DTO for compliance with fieldConf.
 * Also adds @ApiProperty for OpenAPI documentation.
 * @param fieldName — name of the field. For example: email, recoveryCode, cityId
 * @param dbFieldConf — database field config object
 * @param rewrittenDbConfigFields — changes for database field config object
 */
export function DtoFieldDecorators(
	fieldName: string,
	dbFieldConf: BdConfig.Field,
	rewrittenDbConfigFields: Partial<BdConfig.Field> = {},
) {
	const updatedFieldConf = Object.assign(dbFieldConf, rewrittenDbConfigFields) as BdConfig.Field & Record<string, any>

	// Set the first letter to lowercase 'password' -> 'Password'
	const name = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)

	const decorators: any[] = []

	decorators.push(getApiPropertyDecorator(updatedFieldConf))

	// --- class-validator decorators ---
	if (updatedFieldConf.type === 'index') {
		decorators.push(Type(() => Number)) // Converts string to number
		decorators.push(IsNumber({}, { message: serializeErrorMessage(errorMessage.mustBeNumber) }))
	}
	if (updatedFieldConf.type === 'manyToOne') {
		decorators.push(Type(() => Number)) // Converts string to number
		decorators.push(IsNumber({}, { message: serializeErrorMessage(errorMessage.mustBeNumber) }))
		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}
	if (updatedFieldConf.type === 'string') {
		decorators.push(IsString({ message: serializeErrorMessage(errorMessage.mustBeString(name)) }))
		decorators.push(Trim())

		if (updatedFieldConf.minLength) {
			decorators.push(
				MinLength(updatedFieldConf.minLength, {
					message: serializeErrorMessage(errorMessage.minCharacters(updatedFieldConf.minLength)),
				}),
			)
		}

		if (updatedFieldConf.maxLength) {
			decorators.push(
				MaxLength(updatedFieldConf.maxLength, {
					message: serializeErrorMessage(errorMessage.maxCharacters(updatedFieldConf.maxLength)),
				}),
			)
		}

		if (updatedFieldConf.match) {
			decorators.push(
				Matches(updatedFieldConf.match, {
					message: serializeErrorMessage(errorMessage.stringDoesNotMatch(name)),
				}),
			)
		}

		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}
	if (updatedFieldConf.type === 'enum') {
		decorators.push(IsString({ message: serializeErrorMessage(errorMessage.mustBeString(name)) }))
		decorators.push(IsIn(updatedFieldConf.variants, { message: serializeErrorMessage(errorMessage.mustBeEnumValue(name)) }))
		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}
	if (updatedFieldConf.type === 'dateString') {
		decorators.push(
			IsDateString(
				{},
				{
					message: serializeErrorMessage(errorMessage.stringDateInISO(name)),
				},
			),
		)

		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}
	if (updatedFieldConf.type === 'email') {
		decorators.push(IsString({ message: serializeErrorMessage(errorMessage.mustBeString(name)) }))
		decorators.push(IsEmail({}, { message: serializeErrorMessage(errorMessage.email.wrongFormat) }))
		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}
	if (updatedFieldConf.type === 'number') {
		decorators.push(Type(() => Number)) // Converts string to number
		decorators.push(IsNumber({}, { message: serializeErrorMessage(errorMessage.mustBeNumber) }))

		if (updatedFieldConf.min) {
			decorators.push(
				Min(updatedFieldConf.min, {
					message: serializeErrorMessage(errorMessage.minNum(updatedFieldConf.min)),
				}),
			)
		}
		if (updatedFieldConf.max) {
			decorators.push(
				Max(updatedFieldConf.max, {
					message: serializeErrorMessage(errorMessage.maxNum(updatedFieldConf.max)),
				}),
			)
		}
		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}
	if (updatedFieldConf.type === 'boolean') {
		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
		decorators.push(
			Transform(({ value }) => {
				if (value === true || value === false) return value
				if (value === 1 || value === '1') return true
				if (value === 0 || value === '0') return false
				if (typeof value === 'string') {
					const v = value.trim().toLowerCase()
					if (v === 'true') return true
					if (v === 'false') return false
				}
				return value
			}),
		)
		decorators.push(IsBoolean({ message: serializeErrorMessage(errorMessage.mustBeBoolean(name)) }))
	}
	if (updatedFieldConf.type === 'array') {
		let errMessage = serializeErrorMessage(errorMessage.mustBeArray(name))

		if (updatedFieldConf.arrayItemType === 'string') {
			errMessage = serializeErrorMessage(errorMessage.mustBeArrayOfStrings(name))
		}

		if (updatedFieldConf.arrayItemType === 'mongoId') {
			errMessage = serializeErrorMessage(errorMessage.mustBeArrayOfMongoDBStrings(name))
		}

		decorators.push(IsArray({ message: errMessage }))

		if (updatedFieldConf.arrayItemType === 'string') {
			decorators.push(IsString({ each: true, message: serializeErrorMessage(errorMessage.mustBeString(name)) }))
		}

		if (!updatedFieldConf.required) {
			decorators.push(IsOptional())
		}
	}

	return applyDecorators(...decorators)
}

/**
 * Builds @ApiProperty options object from bdConfig field metadata.
 * Used by both DtoFieldDecorators (for DTOs) and Out-models (via @ApiProperty(getApiPropertyOptions($.field))).
 */
export function getApiPropertyOptions(fieldConf: Record<string, any>) {
	const options: Record<string, any> = {}

	if (fieldConf.description) {
		options.description = fieldConf.description
	}

	if (fieldConf.example !== undefined) {
		options.example = fieldConf.example
	}

	if (fieldConf.required !== undefined) {
		options.required = fieldConf.required
		options.nullable = !fieldConf.required
	}

	if (fieldConf.minLength !== undefined) {
		options.minLength = fieldConf.minLength
	}
	if (fieldConf.maxLength !== undefined) {
		options.maxLength = fieldConf.maxLength
	}

	if (fieldConf.min !== undefined) {
		options.minimum = fieldConf.min
	}
	if (fieldConf.max !== undefined) {
		options.maximum = fieldConf.max
	}

	const typeMap: Record<string, string> = {
		string: 'string',
		email: 'string',
		enum: 'string',
		dateString: 'string',
		dateTime: 'string',
		timeString: 'string',
		number: 'number',
		index: 'number',
		uuidIndex: 'number',
		boolean: 'boolean',
		array: 'array',
	}

	if (fieldConf.type && typeMap[fieldConf.type]) {
		options.type = typeMap[fieldConf.type]
	}

	return options
}

/**
 * Builds @ApiProperty decorator from bdConfig field metadata for OpenAPI documentation.
 */
function getApiPropertyDecorator(fieldConf: Record<string, any>) {
	return ApiProperty(getApiPropertyOptions(fieldConf))
}
