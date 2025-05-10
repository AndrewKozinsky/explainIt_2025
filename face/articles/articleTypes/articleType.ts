import { ReactNode } from 'react'
import ExercisesType from './exercisesType'

namespace ArticleType {
	// Стандартная статья
	export type Art = {
		meta: ArtMeta
		// Содержимое статьи
		content: Content
	}

	// Метаданные статьи
	export type ArtMeta = {
		// Порядковый номер статьи
		number: number
		// Название статьи в адресной строке ('toBe')
		slug: string
		// Название статьи ('Глагол to be из данных')
		name: string
		// Описание статьи
		description: string
		// Статья опубликована?
		keywords: string
	}

	// Содержимое статьи
	export type Content = (
		| Header
		| Paragraph
		| RusToEng
		| Note
		| Faq
		| Image
		| Grid
		| List
		| ExercisesType.ExercisesObj
	)[]

	// Заголовок
	export type Header = {
		type: 'header'
		// Тег
		tag: HeaderTag
		// Стиль тега
		style: HeaderStyle
		// Текст заголовка
		text: string
	}
	export type HeaderTag = 'h2' | 'h3' | 'h4'
	export type HeaderStyle = 'h2' | 'h3' | 'h4'

	// Абзац. Включает в себя строковые элементы.
	export type Paragraph = {
		type: 'paragraph'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		// Размер текста
		textSize?: ParagraphSize
		children: TextContent[]
	}
	export type ParagraphSize = 'small' | 'normal' | 'big' | 'giant'

	// Абзац. Включает в себя строковые элементы.
	export type RusToEng = {
		type: 'rusToEng'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		// Размер текста
		textSize?: ParagraphSize
		revert?: boolean
		rus: Text[]
		eng: Text[]
	}

	// Список. Включает в себя блочные элементы.
	export type List = {
		type: 'list'
		// Нумерованный или ненумерованный список?
		listType: 'numbers' | 'dots'
		children: Paragraph[]
	}

	// Текст. Строковый элемент помещаемый в абзац.
	export type Text = {
		type: 'text'
		// Стиль текста
		color?: TextColor
		// Жирность текста
		weight?: 'normal' | 'bold'
		text: string
	}
	export type TextColor = 'black' | 'blue' | 'gold' | 'error' | 'gray'

	// Текст. Строковый элемент помещаемый в абзац.
	export type ArrowText = {
		type: 'arrow'
	}

	export type TextContent = Text | ArrowText

	// Заметка. Может включать весь доступный контент: заголовки, абзацы, грамматические таблицы.
	export type Note = {
		type: 'note'
		// Стиль заметки
		noteStyle?: 'gray' | 'yellow'
		children: Content
	}

	// Нестандартный компонент статьи
	export type Image = {
		type: 'image'
		src?: string
		alt?: string
		extraClass?: string
		children?: ReactNode
	}

	// Вопросы и ответы.
	export type Faq = {
		type: 'faq'
		items: FaqItem[]
	}
	export type FaqItem = {
		question: FaqQuestion
		answer: FaqAnswer
	}
	export type FaqQuestion = { type: 'plain'; value: string } | { type: 'ReactNode'; value: Content }

	export type FaqAnswer = { type: 'plain'; value: string[] } | { type: 'ReactNode'; value: Content }

	// Сетка с горизонтальными колонками.
	export type Grid = {
		type: 'grid'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		// Случайный идентификатор сетки. Требуется внутри сетки чтобы автоматически создать стили для конкретной сетки.
		gridId: string
		cells: GridCell[]
	}
	// Ячейка сетки
	export type GridCell = {
		// Минимальная ширина. Если будет меньше, то ячейка переместится вниз.
		// Строка вида '100px' или '50%'.
		minWidth?: string
		// Ширина
		// Строка вида '100px' или '50%'.
		width?: string
		children: Content
	}
}

export default ArticleType
