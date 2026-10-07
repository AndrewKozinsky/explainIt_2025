jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { ConfigService } from '@nestjs/config'
import { MainConfigService } from './mainConfig.service'

describe('Black Forest Labs configuration', () => {
	function createConfig(apiKey?: string) {
		const env = {
			get: jest.fn((name: string) => {
				if (name === 'BLACK_FOREST_LABS_API_KEY') return apiKey
				if (name === 'GOOGLE_AI_SERVICE_ACCOUNT_JSON') return Buffer.from('{}').toString('base64')
				return 'configured'
			}),
		}
		return { config: new MainConfigService(env as unknown as ConfigService), env }
	}
	it('reads the renamed key through getEnVariables and exposes it through get', () => {
		const { config, env } = createConfig('  test-key  ')
		const readVariables = jest.spyOn(config, 'getEnVariables')
		expect(config.get().blackForestLabs.apiKey).toBe('test-key')
		expect(readVariables).toHaveBeenCalledTimes(1)
		expect(env.get).toHaveBeenCalledWith('BLACK_FOREST_LABS_API_KEY')
		expect(env.get).not.toHaveBeenCalledWith('BFL_API_KEY')
	})
	it.each([undefined, '', '   '])('keeps the key optional for value %s', (value) => {
		const { config } = createConfig(value)
		expect(config.getEnVariables().blackForestLabs.apiKey).toBeNull()
		expect(config.get().blackForestLabs.apiKey).toBeNull()
	})
})
