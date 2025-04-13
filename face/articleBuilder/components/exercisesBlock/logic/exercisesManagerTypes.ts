// import ArticleType from '../../articlesData/articleType'
// import ExercisesType from '../../articlesData/exercisesType'

/*export namespace ExercisesManagerTypes {
	export type Store = {
		// Письменные упражнения
		exercisesWriting: Exercise[]
		// Голосовые упражнения
		exercisesOral: Exercise[]
		// Текущее упражнение
		currentExercise: Exercise
		// Что показывать в результате проверки перевода данного учеником
		analysis: Analysis
	}

	export type Exercise = ExercisesType.Exercise & {
		id: number
		isCurrent: boolean
		type: ExerciseType
		userTranslate: string
	}

	// Типы упражнений
	export enum ExerciseType {
		// Письменное
		write = 'write',
		// Голосовое
		oral = 'oral',
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

	export enum Event {
		storeChanged = 'storeChanged',
	}
}*/
