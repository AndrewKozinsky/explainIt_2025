import * as fs from 'node:fs'
import * as YAML from 'yaml'
import {createDockerConfig, Mode} from './createDockerConfig'

// Массив с названием и контентом трёх файлов.
const configs = [
	{
		// Докер для тестирования
		name: 'local.test',
		content: createDockerConfig(Mode.test),
	},
	{
		// Докер для разработки
		name: 'local.dev',
		content: createDockerConfig(Mode.dev),
	},
	{
		// Докер для проверки как соберётся сборка для сервера
		name: 'local.server-check',
		content: createDockerConfig(Mode.publish, true),
	},
	{
		// Докер для развёртывания
		name: 'server.develop',
		content: createDockerConfig(Mode.dev),
	},
	{
		// Докер для развёртывания
		name: 'server.master',
		content: createDockerConfig(Mode.publish),
	},
]

for (let i = 0; i < configs.length; i++) {
	const dataItem = configs[i]

	const filePath = '../../docker-compose.' + dataItem.name + '.yml'
	const content = YAML.stringify(dataItem.content)

	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error(err)
		} else {
			// the file was written successfully
		}
	})
}
