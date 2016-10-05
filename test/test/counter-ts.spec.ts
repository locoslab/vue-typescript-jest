/// <reference path='../../node_modules/@types/jest/index.d.ts' />

import Vue = require('vue')
// see note about importing *.vue files
import CounterTs = require('../src/counter-ts.vue')

// basic unit testing
describe('counter-ts.vue', () => {
	it('should initialize correctly', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(CounterTs),
		})
		expect(vm.$el.querySelector('div span').textContent).toBe('counter-ts')
		expect(vm.$el.querySelector('div span:nth-child(2)').textContent).toBe('1')
	})
})

// or use snapshot testing, e.g., with html2jade
function clickNthButton(el: HTMLElement, n: number) {
	(<HTMLButtonElement>el.querySelector('div button:nth-of-type(' + n + ')')).click()
}
const html2jade = require('html2jade')

describe('counter-ts.vue', () => {
	it('should just work', () => new Promise(function(resolve, reject) {
		const vm = new Vue({
			el: document.createElement('div'),
			render: (h) => h(CounterTs),
		})
		clickNthButton(vm.$el, 1)
		clickNthButton(vm.$el, 3)
		clickNthButton(vm.$el, 2)
		Vue.nextTick( () => {
			html2jade.convertHtml(vm.$el.innerHTML, {bodyless: true}, (err: any, jade: string) => {
				expect(jade).toMatchSnapshot()
				resolve()
			})
		})
	}))
})
