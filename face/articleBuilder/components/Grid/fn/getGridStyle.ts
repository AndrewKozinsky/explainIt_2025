// import ArticleType from '../../../../articlesData/articleType'

/**
 * Генерирует стили ячеек сетки чтобы они складывались в один столбик если места не достаточно.
 * @param gridConfig — конфигурация сетки
 */
/*export function getStyleTagCss(gridConfig: ArticleType.Grid) {
	const { gridId } = gridConfig

	// Есть ли ячейки с указанной шириной
	const isThereCellsWithWidth = Boolean(
		gridConfig.cells.find((cell) => {
			return cell.minWidth
		}),
	)

	// Если ячеек с указанной шириной нет, то задать display: flex
	if (!isThereCellsWithWidth) {
		return `
			#${gridId} {
				display: flex;
				flex-wrap: wrap;
			}
			#${gridId} .art-grid__cell {
				min-width: min-content;
				max-width: max-content;
			}`
	}

	// Получение минимальных ширин ячеек
	// @ts-ignore
	const cellsMinWidths: string[] = gridConfig.cells.map((cell) => {
		return cell.minWidth
	})

	// Получение минимальной ширины сетки чтобы уместились все элементы
	const minGridWidth = cellsMinWidths.join(' + ') // '50% + 50%'

	// Оборачивание стиля ячеек в @media
	return `
	#${gridId} {
		display: grid;
	}
@media (min-width: calc(${minGridWidth})) {
	#${gridId} {
		grid-template-columns: ${gridConfig.cells.map((cell) => cell.width).join(' ')};
	}
}
`
}*/

