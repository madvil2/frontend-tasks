import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { mockMatchMedia } from './test/mockMatchMedia'

// jsdom has neither <dialog> modal methods nor matchMedia.
HTMLDialogElement.prototype.showModal = function showModal() {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function close() {
  this.removeAttribute('open')
  this.dispatchEvent(new Event('close'))
}

// No vitest globals, so Testing Library cannot register cleanup itself.
afterEach(cleanup)

beforeEach(() => {
  mockMatchMedia(false)
  localStorage.clear()
})
