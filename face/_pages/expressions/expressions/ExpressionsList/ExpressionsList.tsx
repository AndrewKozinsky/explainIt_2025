import LessonSection from './LessonSection'

async function ExpressionsList() {
	return (
		<div>
			<LessonSection title='Выражения' subDir='expressions' />
			<LessonSection title='Фразовые глаголы' subDir='phrasalVerbs' />
		</div>
	)
}

export default ExpressionsList
