import { getItem, setItem } from './storage'

const ONBOARDING_KEY = 'hideOnboardingModal'

export const onboarding = {
	shouldShow(): boolean {
		if (typeof window === 'undefined') return false
		return getItem(ONBOARDING_KEY) !== 'true'
	},

	hide() {
		setItem(ONBOARDING_KEY, 'true')
	},
}
