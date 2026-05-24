import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
import LessonSection from './LessonSection'
import './ExpressionsList.scss'

async function ExpressionsList() {
	return (
		<div className='expressions-list'>
			<SectionWithHeader title='Выражения'>
				<LessonSection subDir='expressions' />
			</SectionWithHeader>
			<SectionWithHeader title='Фразовые глаголы'>
				<LessonSection subDir='phrasalVerbs' />
			</SectionWithHeader>
		</div>
	)
}

export default ExpressionsList
