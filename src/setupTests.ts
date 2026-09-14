import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { mockMatchMedia } from './test/mockMatchMedia'

// jsdom implements neither <dialog> modal methods nor matchMedia. The polyfill only toggles
// the `open` attribute, so focus behaviour of real modal dialogs is not covered by the tests.
HTMLDialogElement.prototype.showModal = function showModal() {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function close() {
  this.removeAttribute('open')
  this.dispatchEvent(new Event('close'))
}

// Without vitest globals, Testing Library cannot register its own afterEach cleanup.
afterEach(cleanup)

beforeEach(() => {
  mockMatchMedia(false)
  localStorage.clear()
})
