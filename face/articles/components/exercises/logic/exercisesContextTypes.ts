import ArticleType from '../../../articleTypes/articleType'
import ExercisesType from '../../../articleTypes/exercisesType'

export namespace ExercisesContextType {
	export type ExercisesBlock = {
		// Текущее упражнение
		currentExerciseId: number
		currentExerciseType: ExerciseType
		// Что показывать в результате проверки перевода данного учеником
		exercises: Exercise[]
		analysis: Analysis
	}

	// Типы упражнений
	export enum ExerciseType {
		// Письменное
		write = 'write',
		// Голосовое
		oral = 'oral',
	}

	export type Exercise = ExercisesType.Exercise & {
		id: number
		userTranslate: string
	}

	// Тип показываемого анализа перевода данного учеником
	export type Analysis = HiddenAnalysis | LoadingAnalysis | ErrorAnalysis | VisibleAnalysis

	// Не показывать разбор перевода данного учеником
	type HiddenAnalysis = {
		status: AnalysisStatus.hidden
	}

	// Загружается результат перевода данного учеником
	type LoadingAnalysis = {
		status: AnalysisStatus.loading
	}

	// Ошибка при получении результата на перевод данным учеником
	type ErrorAnalysis = {
		status: AnalysisStatus.error
	}

	// Показать разбор перевода данного учеником
	export type VisibleAnalysis = {
		status: AnalysisStatus.visible
		isTranslateCorrect: boolean
		correctTranslations: ExercisesType.EngSentence[]
		translateAnalysis: undefined | ArticleType.Content
	}

	export enum AnalysisStatus {
		hidden = 'hidden',
		loading = 'loading',
		error = 'error',
		visible = 'visible',
	}
}
