import { getDeviceType } from 'utils/utils'
import { create } from 'zustand'
import { registerKeyboardListeners } from './listeners'

export type SystemStoreValues = {
	deviceType: 'desktop' | 'touch'
	isCmdKeyPressed: boolean
}

export type SystemStoreMethods = {
	setDeviceType: (deviceType: SystemStoreValues['deviceType']) => void
	setIsCmdKeyPressed: (isCmdKeyPressed: boolean) => void
}

export type SystemStore = SystemStoreValues & SystemStoreMethods

export const useSystemStore = create<SystemStore>()((set) => {
	if (typeof window !== 'undefined') {
		registerKeyboardListeners({
			setIsCmdKeyPressed: (value: boolean) => set({ isCmdKeyPressed: value }),
		})
	}

	return {
		deviceType: typeof window !== 'undefined' ? getDeviceType() : 'desktop',
		isCmdKeyPressed: false,
		setDeviceType: (deviceType: SystemStoreValues['deviceType']) => {
			set({ deviceType })
		},
		setIsCmdKeyPressed(isCmdKeyPressed: boolean) {
			set({ isCmdKeyPressed })
		},
	}
})
