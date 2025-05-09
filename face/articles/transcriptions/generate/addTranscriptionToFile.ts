import { parse, visit, print } from 'recast'
import * as fs from 'fs'
import * as tsParser from 'recast/parsers/typescript'
import { builders as b } from 'ast-types'

/**
 * Adds a new transcription entry to the transcriptions.ts file.
 * This function reads the file, parses it using recast, finds the transcriptions object,
 * adds a new property "i_love" with specified values, and writes the updated content back to the file.
 * @param transcriptionObject — transcription object with the following properties:
 * key — It's used as a key in the transcriptions object: "i_learn_english" from "I learn English."
 * engSentence — Regular English sentence: "I learn English."
 * transcription — transcription of English sentence
 * audio — is an audio file available for this sentence?
 */
export function addTranscriptionToFile(transcriptionObject: {
	key: string
	engSentence: string
	transcription?: string
	audio?: boolean
}) {
	const filePath = __dirname + '/../transcriptions.ts'
	const code = fs.readFileSync(filePath, 'utf-8')

	// Parse the TypeScript code into an AST
	const ast = parse(code, {
		parser: tsParser,
	})

	// Visit the AST to find and modify the transcriptions object
	visit(ast, {
		visitVariableDeclaration(path) {
			const declaration = path.node.declarations[0]

			// Check if this is the transcriptions declaration
			// @ts-ignore
			if (declaration && declaration.id && declaration.id.name === 'transcriptions') {
				let objectExpression = null

				// Handle different types of initializers
				// @ts-ignore
				if (declaration.init) {
					// @ts-ignore
					if (declaration.init.type === 'ObjectExpression') {
						// Direct object expression
						// @ts-ignore
						objectExpression = declaration.init
						// @ts-ignore
					} else if (declaration.init.type === 'TSSatisfiesExpression') {
						// TypeScript 'satisfies' expression - the object is in the 'expression' property
						// @ts-ignore
						if (declaration.init.expression && declaration.init.expression.type === 'ObjectExpression') {
							// @ts-ignore
							objectExpression = declaration.init.expression
						}
					}
				}

				// If we found the object expression, add the new property
				if (objectExpression) {
					// Create the new property to add to the transcriptions object
					const newProperty = b.property(
						'init',
						b.identifier(transcriptionObject.key),
						b.objectExpression([
							b.property('init', b.identifier('sentence'), b.literal(transcriptionObject.engSentence)),
							b.property(
								'init',
								b.identifier('transcription'),
								b.literal(transcriptionObject.transcription || ''),
							),
							b.property('init', b.identifier('audio'), b.literal(transcriptionObject.audio || false)),
						]),
					)

					// Add the new property to the transcriptions object
					objectExpression.properties.push(newProperty)
				}
			}

			this.traverse(path)
		},
	})

	const updatedCode = print(ast).code
	fs.writeFileSync(filePath, updatedCode)
}
