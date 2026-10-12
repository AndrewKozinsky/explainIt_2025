import { bdConfig } from '../../dbConfig/dbConfig'
import { createSchema } from '../createSchema'

describe('user avatar schema generation', () => {
	it('quotes the preset default and defaults existing/new users to male', () => {
		const schema = createSchema({ User: bdConfig.User })
		expect(schema).toContain('avatar_preset_id\tString?\t@default("male-1")')
		expect(schema).toContain('gender\tUserGender\t@default(MALE)')
		expect(schema).toContain('avatar_s3_key\tString?')
	})
})
