import { ComponentType } from 'react'
import { CameraIcon } from '@/shared/ui/icons/mainPage/CameraIcon'
import { DoorExitIcon } from '@/shared/ui/icons/mainPage/DoorExitIcon'
import { MainPageIconProps } from '@/shared/ui/icons/mainPage/iconProps'
import { MessagesIcon } from '@/shared/ui/icons/mainPage/MessagesIcon'

export type ScenarioId = 'origin' | 'leave' | 'director'

export type ScenarioConfig = {
	// Ключ сценария в переводах: mainPageScenarios.scenarios.{id}
	id: ScenarioId
	Icon: ComponentType<MainPageIconProps>
	// Иллюстрация для ретины: показывается вдвое меньше своего размера
	imagePath: string
}

// Сценарии в порядке показа. Тексты лежат в переводах, здесь только иконки и иллюстрации персонажей
export const scenarioConfigs: ScenarioConfig[] = [
	{
		id: 'origin',
		Icon: MessagesIcon,
		imagePath: '/mainPage/scenarios/scenario-taxi-driver.webp',
	},
	{
		id: 'leave',
		Icon: DoorExitIcon,
		imagePath: '/mainPage/scenarios/scenario-cafe-owner.webp',
	},
	{
		id: 'director',
		Icon: CameraIcon,
		// Заглушка: замените на иллюстрацию администратора отеля
		imagePath: '/mainPage/scenarios/scenario-hotel-admin.webp',
	},
]
