import type { ComponentProps } from 'react'
import styles from './Button.module.scss'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
}

export function Button({
  variant = 'secondary',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...rest} />
}
