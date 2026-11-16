import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { getNextBalanceRefill } from '@/entities/user/fn/getNextBalanceRefill'
import { languageKeys } from '@/shared/utils/languages'

function withTimeZone(timeZone: string, check: () => void) {
	const previousTimeZone = process.env.TZ
	process.env.TZ = timeZone

	try {
		check()
	} finally {
		process.env.TZ = previousTimeZone
	}
}

test('balance is refilled at the next 00:00 UTC', () => {
	const nextRefill = getNextBalanceRefill(new Date('2026-11-15T17:30:00Z'))

	assert.equal(nextRefill.refillTime, Date.parse('2026-11-16T00:00:00Z'))
})

test('refill east of UTC falls on today before local 03:00 and on tomorrow after it', () => {
	withTimeZone('Europe/Moscow', () => {
		assert.equal(getNextBalanceRefill(new Date('2026-11-15T22:30:00Z')).isToday, true) // 01:30 по Москве
		assert.equal(getNextBalanceRefill(new Date('2026-11-15T17:30:00Z')).isToday, false) // 20:30 по Москве
	})
})

test('refill west of UTC falls on today', () => {
	withTimeZone('America/New_York', () => {
		assert.equal(getNextBalanceRefill(new Date('2026-11-15T15:00:00Z')).isToday, true) // 10:00 в Нью-Йорке
	})
})

test('limit notice texts exist for the same keys in every language', () => {
	const keysByLanguage = languageKeys.map((language) => {
		const noticeTexts = JSON.parse(readFileSync(`messages/${language}/balanceExhaustedNotice.json`, 'utf8'))
		return Object.keys(noticeTexts).sort().join(',')
	})

	assert.equal(new Set(keysByLanguage).size, 1)
})

test('pricing page texts exist for the same keys in every language', () => {
	function getNestedKeys(texts: Record<string, unknown>, prefix = ''): string[] {
		return Object.entries(texts).flatMap(([key, text]) =>
			typeof text === 'object' && text !== null
				? getNestedKeys(text as Record<string, unknown>, `${prefix}${key}.`)
				: [`${prefix}${key}`],
		)
	}

	const keysByLanguage = languageKeys.map((language) => {
		const pricingTexts = JSON.parse(readFileSync(`messages/${language}/pricingPage.json`, 'utf8'))
		return getNestedKeys(pricingTexts).sort().join(',')
	})

	assert.equal(new Set(keysByLanguage).size, 1)
})
