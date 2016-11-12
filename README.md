# vue-typescript-jest [![Build Status](https://travis-ci.org/locoslab/vue-typescript-jest.svg?branch=master)](https://travis-ci.org/locoslab/vue-typescript-jest) [![npm version](https://badge.fury.io/js/vue-typescript-jest.svg)](https://badge.fury.io/js/vue-typescript-jest)
Jest `preprocessor.js` for Vue.js components (supporting html and pug) and TypeScript.

Portions of this project are heavily based on parts of [vueify](https://github.com/vuejs/vueify) (Copyright (c) 2014-2016 Evan You).

## Usage
* Install: `npm install --save-dev vue-typescript-jest`
* This package does not declare any dependencies: install the preferred versions of TypeScript, Jest, Vue.js, and vueify. Cf. [`package.json`](package.json) for the versions used during development.
* Add the following snippet to `package.json` (adapting testRegex to your project layout)
```js
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      ".*\\.(ts|vue)$": "<rootDir>/node_modules/vue-typescript-jest/preprocessor.js"
    },
    "moduleFileExtensions": [
      "ts",
      "js",
      "vue"
    ],
    "testRegex": "/test/.*\\.(ts|js)$",
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/test/.*\\.(ts|js)$",
      "/.*\\.vue$"
    ]
  },
```

* For Jest v16 (earlier versions not tested), use the following instead of `transform`
```js
    "scriptPreprocessor": "<rootDir>/node_modules/vue-typescript-jest/preprocessor.js",
```

* Make sure a suitable `tsconfig.json` is present to specify your required TypeScript compiler options
* Write a test for a Vue.js component
```typescript
/// <reference path='../node_modules/@types/jest/index.d.ts' />

import Vue = require('vue')
// see note about importing *.vue files
import CounterTs = require('./counter-ts.vue')

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
import html2jade = require('html2jade')

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
```

* Use jest as usual, e.g., `npm test -- --watch`

### Notes
* This project looks for `tsconfig.json` starting in the directory of the source file and continuing up in the directory tree
* Only the `compilerOptions` subtree of `tsconfig.json` is used
* To use `import` with `*.vue` files in TypeScript code, cf. <https://github.com/locoslab/vue-typescript-import-dts>
* To further simplify snapshot testing with Jest and html2jade, cf. <https://github.com/locoslab/vue-jest-utils>
* To use TypeScript classes as Vue.js components, cf.
<https://github.com/locoslab/vue-typescript-component>
* Inline TypeScript code in a `*.vue` file is not supported. We prefer separate files to make use of existing IDE/editor and tooling support for TypeScript files. Instead, import the TypeScript module as follows
```html
<template>
...
</template>
<script>
module.exports = require('./counter-ts.ts').default
</script>
```
* Code coverage of `*.vue` files fails as the generated code contains a `with` statement that trips the babylon parser: use `coveragePathIgnorePatterns` as shown above to ignore the `*.vue` files

## Contributing
Contributions including bug reports, tests, and documentation are more than welcome. To get started with development:
``` bash
# once: install dependencies
npm install

# run unit tests in watch mode
npm test -- --watch

# lint & test
npm run prepublish
```

## License
[MIT](http://opensource.org/licenses/MIT)
