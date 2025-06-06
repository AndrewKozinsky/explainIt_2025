/** Database structure type. */
export namespace BdConfig {
	export type Root = Record<string, Table>

	export type Table = {
		dtoProps: Record<string, Field>
		dbFields: Record<string, Field>
	}

	export type Field =
		| IndexField
		| StringField
		| DateStringField
		| TimeStringField
		| BooleanField
		| EmailField
		| NumberField
		| ArrayField
		| CreatedAtField
		| ManyToOneField
		| OneToManyField
		| ParentOneToOneField
		| ChildOneToOneField

	export type IndexField = {
		type: 'index'
	}

	export type StringField = {
		type: 'string'
		minLength?: number
		maxLength?: number
		match?: RegExp
		matchErrorMessage?: string

		// Default value
		default?: string | number | boolean
		// Is the field required? True by default
		required: boolean
		// Is the field value must be unique?
		unique?: boolean
		// Field description
		description?: string
		// Field example value
		example?: string
	}

	export type DateStringField = {
		type: 'dateString'

		// Default value
		default?: string
		// Is the field required? True by default
		required: boolean
		// Is the field value must be unique?
		unique?: boolean
		// Field description
		description?: string
		// Field example value
		example?: string
	}

	export type TimeStringField = {
		type: 'timeString'

		// Default value
		default?: string
		// Is the field required? True by default
		required: boolean
		// Is the field value must be unique?
		unique?: boolean
		// Field description
		description?: string
		// Field example value
		example?: string
	}

	export type BooleanField = {
		type: 'boolean'

		// Default value
		default?: string | number | boolean
		// Is the field required? True by default
		required: boolean
		// Is the field value must be unique?
		unique?: boolean
		// Field description
		description?: string
		// Field example value
		example?: boolean
	}

	export type EmailField = {
		type: 'email'

		// Default value
		default?: string | number | boolean
		// Is the field required? True by default
		required: boolean
		// Is the field value must be unique?
		unique?: boolean
		// Field description
		description?: string
		// Field example value
		example?: string
	}

	export type NumberField = {
		type: 'number'
		min?: number
		max?: number

		// Default value
		default?: string | number | boolean
		// Is the field required? True by default
		required: boolean
		// Is the field value must be unique?
		unique?: boolean
		// Field description
		description?: string
		// Field example value
		example?: number
	}

	export type ArrayField = {
		type: 'array'
		arrayItemType: 'string' | 'mongoId' | 'number'
		// Is the field required? True by default
		required: boolean
		// Field description
		description?: string
		// Field example value
		example?: string[]
	}

	export type CreatedAtField = {
		type: 'createdAt'
	}

	export type ManyToOneField = {
		type: 'manyToOne'
		thisField: string // Name of the column of this table that refers to another table
		foreignTable: string // Name of the table that this column refers to
		foreignField: string // Name of the column of foreign table that this column refers to
	}

	export type OneToManyField = {
		type: 'oneToMany'
	}

	export type ParentOneToOneField = {
		type: 'parentOneToOne'
	}

	export type ChildOneToOneField = {
		type: 'childOneToOne'
		thisField: string // Name of the column of this table that refers to another table
		foreignTable: string // Name of the table that this column refers to
		foreignField: string // Name of the column of foreign table that this column refers to
	}
}
