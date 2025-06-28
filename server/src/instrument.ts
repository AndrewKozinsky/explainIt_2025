// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs'

Sentry.init({
	dsn: 'https://d13f3c5287cc966e46b296d3cac28657@o4509573864554496.ingest.de.sentry.io/4509573866455120',

	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events
	sendDefaultPii: true,
})
