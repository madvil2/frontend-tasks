import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('opens and closes with the open prop', () => {
    const { rerender } = render(
      <Dialog open={false} onClose={() => {}} labelledBy="t">
        <h2 id="t">Hi</h2>
      </Dialog>,
    )
    const dialog = screen.getByText('Hi').closest('dialog')
    expect(dialog).not.toHaveAttribute('open')

    rerender(
      <Dialog open onClose={() => {}} labelledBy="t">
        <h2 id="t">Hi</h2>
      </Dialog>,
    )
    expect(dialog).toHaveAttribute('open')

    rerender(
      <Dialog open={false} onClose={() => {}} labelledBy="t">
        <h2 id="t">Hi</h2>
      </Dialog>,
    )
    expect(dialog).not.toHaveAttribute('open')
  })

  it('calls onClose on the native close event', () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose} labelledBy="t">
        <h2 id="t">Hi</h2>
      </Dialog>,
    )
    screen.getByText('Hi').closest('dialog')?.close()
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
