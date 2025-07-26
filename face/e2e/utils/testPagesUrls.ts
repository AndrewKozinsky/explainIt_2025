import { pageUrls } from '../../сonsts/pageUrls'

class TestPageUrls {
	host = 'http://localhost'
	course = this.host + pageUrls.course.path

	getUrls() {
		return {
			main: this.host,
			course: this.course,
			article1: this.course + '/test-1/',
			article2: this.course + '/test-2/',
			article3: this.course + '/test-3/',
			graphql: this.host + 'graphql',
			authRegister: this.host + pageUrls.auth.register.path,
			authLogin: this.host + pageUrls.auth.login.path,
			llm: this.host + pageUrls.llm.path,
		}
	}
}

const testPagesUrls = new TestPageUrls().getUrls()
export default testPagesUrls
