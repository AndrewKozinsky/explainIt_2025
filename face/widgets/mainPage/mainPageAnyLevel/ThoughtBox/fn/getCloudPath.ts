// Радиусы бугорков по очереди, в пикселях: разные, чтобы облако не выглядело штампованным
const bumpRadii = [20, 16.5, 22.5, 18, 21, 17, 23, 19]

// Отступ от краёв блока до линии центров бугорков: так бугорки не выходят за блок
export const cloudBumpInset = Math.max(...bumpRadii)

// Расстояние между центрами соседних бугорков в долях суммы их радиусов.
// Меньше единицы — бугорки перекрываются, и между ними остаётся острая впадина без плоских участков
const bumpSpacing = 0.88

type Point = { x: number; y: number }

/**
 * Путь облака для блока заданного размера.
 * Под текстом прямоугольник, по его краю цепочка перекрывающихся бугорков.
 * Все контуры идут по часовой стрелке, поэтому сливаются в одну фигуру
 */
export function getCloudPath(width: number, height: number): string {
	const left = cloudBumpInset
	const top = cloudBumpInset
	const right = Math.max(width - cloudBumpInset, left)
	const bottom = Math.max(height - cloudBumpInset, top)
	const perimeter = 2 * (right - left + bottom - top)

	if (perimeter === 0) return ''

	// Шаги между соседними бугорками, пока цепочка не обойдёт весь прямоугольник
	const steps: number[] = []
	let stepsLength = 0
	while (stepsLength < perimeter) {
		const step = bumpSpacing * (getBumpRadius(steps.length) + getBumpRadius(steps.length + 1))
		steps.push(step)
		stepsLength += step
	}

	// Шаги немного сжимаются, чтобы последний бугорок встал вплотную к первому
	const stepScale = perimeter / stepsLength

	let distance = 0
	const bumpPaths = steps.map((step, index) => {
		const center = getPerimeterPoint(distance, left, top, right, bottom)
		distance += step * stepScale
		return getCirclePath(center, getBumpRadius(index))
	})

	const rectPath = `M${left},${top} H${round(right)} V${round(bottom)} H${left} Z`

	return [rectPath, ...bumpPaths].join(' ')
}

function getBumpRadius(index: number) {
	return bumpRadii[index % bumpRadii.length]
}

/** Точка на краю прямоугольника на заданном расстоянии от левого верхнего угла по часовой стрелке */
function getPerimeterPoint(distance: number, left: number, top: number, right: number, bottom: number): Point {
	const width = right - left
	const height = bottom - top

	if (distance < width) return { x: left + distance, y: top }
	distance -= width

	if (distance < height) return { x: right, y: top + distance }
	distance -= height

	if (distance < width) return { x: right - distance, y: bottom }
	distance -= width

	return { x: left, y: bottom - distance }
}

/** Круг из двух дуг по часовой стрелке */
function getCirclePath(center: Point, radius: number) {
	const x = round(center.x - radius)
	const y = round(center.y)

	return `M${x},${y} a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 ${-radius * 2},0 Z`
}

function round(value: number) {
	return Math.round(value * 10) / 10
}
