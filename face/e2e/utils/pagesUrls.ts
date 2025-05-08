class PagesUrls {
	host = 'http://localhost/'
	course = this.host + 'course/'

	getUrls() {
		return {
			main: this.host,
			course: this.course,
			article1: this.course + 'test-1/',
			article2: this.course + 'test-2/',
			article3: this.course + 'test-3/',
			graphql: this.host + 'graphql',
		}
	}
}

const pagesUrls = new PagesUrls().getUrls()
export default pagesUrls
