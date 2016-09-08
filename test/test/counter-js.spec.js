const Vue = require('vue')
const html2jade = require('html2jade')

const CounterJs = require('../src/counter-js.vue')

describe('counter-js.vue', () => {
	it('should initialize correctly', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(CounterJs),
		})
		expect(vm.$el.querySelector('div span').textContent).toBe('counter-js')
		expect(vm.$el.querySelector('div span:nth-child(2)').textContent).toBe('1')
	})
})

describe('counter-js.vue', () => {
	it('should just work', () => new Promise(function(resolve, reject) {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(CounterJs),
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
