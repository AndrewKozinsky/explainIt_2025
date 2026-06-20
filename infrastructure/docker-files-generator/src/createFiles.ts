import * as fs from 'node:fs'
import * as YAML from 'yaml'
import {createDockerConfig, Mode, Region} from './createDockerConfig'

// Массив с названием и контентом файлов.
const configs = [
	{
		// Докер для тестирования
		name: 'local.test.ru',
		content: createDockerConfig(Mode.localTest, 'ru'),
	},
	{
		// Докер для тестирования (международная версия)
		name: 'local.test.intl',
		content: createDockerConfig(Mode.localTest, 'intl'),
	},
	{
		// Докер для разработки
		name: 'local.dev.ru',
		content: createDockerConfig(Mode.localDev, 'ru'),
	},
	{
		// Докер для разработки (международная версия)
		name: 'local.dev.intl',
		content: createDockerConfig(Mode.localDev, 'intl'),
	},
	{
		// Докер для проверки как соберётся сборка для сервера
		name: 'local.server-check.ru',
		content: createDockerConfig(Mode.localCheckServer, 'ru'),
	},
	{
		// Докер для проверки как соберётся сборка для сервера (международная версия)
		name: 'local.server-check.intl',
		content: createDockerConfig(Mode.localCheckServer, 'intl'),
	},
	{
		// Докер для развёртывания на dev-сервере (Россия)
		name: 'server.develop.ru',
		content: createDockerConfig(Mode.serverDevelop, 'ru'),
	},
	{
		// Докер для развёртывания на dev-сервере (международная версия)
		name: 'server.develop.intl',
		content: createDockerConfig(Mode.serverDevelop, 'intl'),
	},
	{
		// Докер для развёртывания на prod-сервере (Россия)
		name: 'server.master.ru',
		content: createDockerConfig(Mode.serverMaster, 'ru'),
	},
	{
		// Докер для развёртывания на prod-сервере (международная версия)
		name: 'server.master.intl',
		content: createDockerConfig(Mode.serverMaster, 'intl'),
	},
]

const outputDir = '../../docker'

// Create docker directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir)
}

for (let i = 0; i < configs.length; i++) {
	const dataItem = configs[i]

	const filePath = `${outputDir}/docker-compose.${dataItem.name}.yml`
	const content = YAML.stringify(dataItem.content)

	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error(err)
		} else {
			// The file was written successfully
		}
	})
}
