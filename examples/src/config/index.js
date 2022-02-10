import ElIcons from './ElIcons';

export default {
	install(app) {
		[ElIcons].forEach(item => {
			app.use(item)
		})
	}
}