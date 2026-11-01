import { ComponentType } from 'react'
import { DoorExitIcon } from '@/shared/ui/icons/mainPage/DoorExitIcon'
import { MainPageIconProps } from '@/shared/ui/icons/mainPage/iconProps'
import { MessagesIcon } from '@/shared/ui/icons/mainPage/MessagesIcon'
import { ShortArrowIcon } from '@/shared/ui/icons/mainPage/ShortArrowIcon'

export type ScenarioId = 'origin' | 'leave' | 'director'

export type ScenarioConfig = {
	// Ключ сценария в переводах: mainPageScenarios.scenarios.{id}
	id: ScenarioId
	Icon: ComponentType<MainPageIconProps>
	imagePath: string
	imageWidth: number
	imageHeight: number
}

// Сценарии в порядке показа. Тексты лежат в переводах, здесь только иконки и иллюстрации персонажей
export const scenarioConfigs: ScenarioConfig[] = [
	{
		id: 'origin',
		Icon: MessagesIcon,
		imagePath: '/mainPage/scenarios/scenario-taxi-driver.webp',
		imageWidth: 260,
		imageHeight: 375,
	},
	{
		id: 'leave',
		Icon: DoorExitIcon,
		imagePath: '/mainPage/scenarios/scenario-cafe-owner.webp',
		imageWidth: 238,
		imageHeight: 356,
	},
	{
		id: 'director',
		Icon: ShortArrowIcon,
		// Заглушка: замените на иллюстрацию администратора отеля
		imagePath: '/mainPage/scenarios/scenario-hotel-admin.webp',
		imageWidth: 260,
		imageHeight: 375,
	},
]
