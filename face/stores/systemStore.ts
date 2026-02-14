import { create } from 'zustand'

export type SystemStoreValues = {
	deviceType: 'desktop' | 'touch'
	isCmdKeyPressed: boolean
}

export const userStoreValues: SystemStoreValues = {
	deviceType: 'desktop',
	isCmdKeyPressed: false,
}

export type SystemStoreMethods = {
	setDeviceType: (deviceType: SystemStoreValues['deviceType']) => void
	setIsCmdKeyPressed: (user: SystemStoreValues['isCmdKeyPressed']) => void
}

export type SystemStore = SystemStoreValues & SystemStoreMethods

export const useSystemStore = create<SystemStore>()((set) => {
	return {
		...userStoreValues,
		setDeviceType: (deviceType: SystemStoreValues['deviceType']) => {
			set({ deviceType })
		},
		setIsCmdKeyPressed(isCmdKeyPressed: boolean) {
			set((state) => {
				return {
					isCmdKeyPressed,
				}
			})
		},
	}
})
