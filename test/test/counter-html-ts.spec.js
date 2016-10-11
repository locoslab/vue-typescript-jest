const Vue = require('vue')
const html2jade = require('html2jade')

const CounterHtmlTs = require('../src/counter-html-ts.vue')

describe('counter-html-ts.vue', () => {
	it('should initialize correctly', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(CounterHtmlTs),
		})
		expect(vm.$el.querySelector('div span').textContent).toBe('counter-ts')
		expect(vm.$el.querySelector('div span:nth-child(2)').textContent).toBe('1')
	})
})

describe('counter-html-ts.vue', () => {
	it('should just work', () => new Promise(function(resolve, reject) {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(CounterHtmlTs),
		})
		vm.$el.querySelector('div button:nth-of-type(1)').click()
		vm.$el.querySelector('div button:nth-of-type(3)').click()
		vm.$el.querySelector('div button:nth-of-type(2)').click()
		Vue.nextTick( () => {
			html2jade.convertHtml(vm.$el.innerHTML, {bodyless: true}, (err, jade) => {
				expect(jade).toMatchSnapshot()
				resolve()
			})
		})
	}))
})
