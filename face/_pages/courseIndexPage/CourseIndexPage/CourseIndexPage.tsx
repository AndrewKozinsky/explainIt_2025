import React from 'react'
import { BreadCrumbs } from '../../../ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '../../../ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageHeader } from '../../../ui/pageRelated/PageHeader/PageHeader'
import { CourseArticlesTiles } from '../tiles/CourseArticlesTiles/CourseArticlesTiles'

import { PageWrapper } from "@/ui/pageRelated/PageWrapper/PageWrapper"

/** Страница со ссылками-плитками на главы курса */
function CourseIndexPage() {
	return (
		<PageWrapper>
		<PageContentWrapper>
			<BreadCrumbs />
			<PageHeader>Понимая английский</PageHeader>
			<CourseArticlesTiles />
		</PageContentWrapper>
			</PageWrapper>
	)
}


export default CourseIndexPage
