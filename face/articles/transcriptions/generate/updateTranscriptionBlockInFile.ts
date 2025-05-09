import fs from 'fs'
import * as recast from 'recast'
import { parse } from 'recast'
import * as tsParser from 'recast/parsers/typescript'
import { transcriptions } from '../transcriptions'

/**
 * It updates properties values in the transcriptions object in face/articles/transcriptions/transcriptions.ts
 * @param transcriptionBlockKey — key in the transcriptions object. For example i_learn_english.
 * @param updatedProperties — What properties you need to update.
 */
export async function updateTranscriptionBlockInFile(
	transcriptionBlockKey: keyof typeof transcriptions,
	updatedProperties: { transcription?: string; audio?: boolean },
) {
	const filePath = __dirname + '/../transcriptions.ts'
	const fileContent = fs.readFileSync(filePath, 'utf-8')

	// Parse the TypeScript code into an AST
	const ast = parse(fileContent, {
		parser: tsParser,
	})

	const b = recast.types.builders

	recast.visit(ast, {
		visitObjectProperty(path) {
			const node = path.node
			const key = node.key as any

			if (key.type === 'Identifier' && key.name === transcriptionBlockKey) {
				const value = node.value as any

				if (value.type === 'ObjectExpression') {
					const props = value.properties

					for (let i = 0; i < props.length; i++) {
						const prop = props[i] as any

						if (updatedProperties.transcription) {
							if (
								prop.type === 'ObjectProperty' &&
								prop.key.type === 'Identifier' &&
								prop.key.name === 'transcription'
							) {
								prop.value = b.stringLiteral(updatedProperties.transcription)
							}
						}
						if (updatedProperties.audio !== undefined) {
							if (
								prop.type === 'ObjectProperty' &&
								prop.key.type === 'Identifier' &&
								prop.key.name === 'audio'
							) {
								prop.value = b.booleanLiteral(updatedProperties.audio)
							}
						}
					}
				}
			}
			return false
		},
	})

	const output = recast.print(ast).code
	fs.writeFileSync(filePath, output, 'utf8')
}
