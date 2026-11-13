import { costInDollarsToMicrodollarsCharge, dollarsToMicrodollars, microdollarsToDollars } from './microdollars'

describe('microdollars', () => {
	it('переводит доллары в микродоллары и обратно', () => {
		expect(dollarsToMicrodollars(0.1)).toBe(100_000)
		expect(dollarsToMicrodollars(0.5)).toBe(500_000)
		expect(microdollarsToDollars(100_000)).toBe(0.1)
	})

	it('округляет стоимость запроса вверх, чтобы списание не было меньше расходов', () => {
		expect(costInDollarsToMicrodollarsCharge(0.0000003)).toBe(1)
		expect(costInDollarsToMicrodollarsCharge(0.0012341)).toBe(1235)
	})

	it('не добавляет лишний микродоллар из-за погрешности float', () => {
		expect(costInDollarsToMicrodollarsCharge(0.000002)).toBe(2)
		expect(costInDollarsToMicrodollarsCharge(0.1 + 0.2)).toBe(300_000)
	})

	it('не списывает нулевую и отрицательную стоимость', () => {
		expect(costInDollarsToMicrodollarsCharge(0)).toBe(0)
		expect(costInDollarsToMicrodollarsCharge(-1)).toBe(0)
	})
})
