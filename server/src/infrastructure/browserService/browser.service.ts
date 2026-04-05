import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { MainConfigService } from '../mainConfig/mainConfig.service'
const expressUseragent = require('express-useragent')
const useragent = expressUseragent.useragent ?? expressUseragent.default

@Injectable()
export class BrowserService {
	constructor(private mainConfig: MainConfigService) {}

	// Returns client's device IP
	getClientIP(req: Request): string {
		return req.header('x-forwarded-for') || req.socket.remoteAddress || 'unknown'
	}

	// Returns client's device name
	getClientName(req: Request): string {
		const header = req.headers['user-agent']
		const source = Array.isArray(header) ? header.join(' ') : (header ?? '')

		const browserInfo = useragent.parse(source || 'unknown')

		const browser = browserInfo?.browser || 'unknown'
		const version = browserInfo?.version || ''
		return version ? `${browser} ${version}` : browser
	}
}
