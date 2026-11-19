import { expect, test } from '@playwright/test'

test('recording waveform has painted geometry under the global CSS reset', async ({ page }) => {
	await page.clock.install({ time: new Date('2026-11-19T12:00:00Z') })
	await page.clock.pauseAt(new Date('2026-11-19T12:00:00Z'))
	await page.goto('/?waveform')
	await page.getByRole('button', { name: 'Диктовать', exact: true }).click()
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await expect(page.getByRole('button', { name: 'Завершить' })).toBeEnabled()
	const waveform = page.locator('.ai-dialogue-input__waveform')
	await expect(waveform).toBeVisible()
	const bars = waveform.locator('path')
	await expect(bars).toHaveCount(1)
	await page.clock.runFor(300)
	expect(await bars.count()).toBeGreaterThan(1)
	expect(await bars.count()).toBeLessThan(10)
	const footerBounds = await page.locator('.ai-dialogue-input__footer').boundingBox()
	const waveBounds = await waveform.boundingBox()
	const buttonBounds = await page.getByRole('button', { name: 'Завершить' }).boundingBox()
	expect(waveBounds!.x).toBeCloseTo(footerBounds!.x, 0)
	expect(buttonBounds!.x - (waveBounds!.x + waveBounds!.width)).toBeCloseTo(10, 0)
	const positions = await bars.evaluateAll((elements) =>
		elements.map((element) => (element as SVGGraphicsElement).getBBox().x),
	)
	expect(positions[positions.length - 1]).toBeCloseTo(waveBounds!.width - 1.5, 1)
	expect(positions[0]).toBeGreaterThan(waveBounds!.width / 2)
	await page.clock.runFor(15_000)
	expect(await bars.count()).toBe(Math.floor(waveBounds!.width / 3.5))
	const geometry = await bars.evaluateAll((elements) =>
		elements.map((element) => {
			const bounds = (element as SVGGraphicsElement).getBBox()
			const style = getComputedStyle(element)
			return { height: bounds.height, stroke: style.stroke, strokeWidth: Number.parseFloat(style.strokeWidth) }
		}),
	)
	for (const bar of geometry) {
		expect(bar.height).toBeGreaterThan(0)
		expect(bar.stroke).not.toBe('none')
		expect(bar.strokeWidth).toBeGreaterThan(0)
	}
})
