import React from 'react'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import Header from '../../../ui/Header/Header'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { CourseArticlesTiles } from '../tiles/CourseArticlesTiles/CourseArticlesTiles'

/** Страница со ссылками-плитками на главы курса */
function CourseIndexPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Понимая английский</Header>
				<CourseArticlesTiles />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default CourseIndexPage
