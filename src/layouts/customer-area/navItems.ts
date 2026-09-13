import type { ComponentType, SVGProps } from 'react'
import {
  CreditIcon,
  DocumentIcon,
  LogoutIcon,
  MailIcon,
  PasswordIcon,
  ReferIcon,
  UserIcon,
} from './icons'

export interface NavItemData {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Only "Persönliche Daten" has a page; other items are placeholders. */
  to?: string
}

export const navItems: readonly NavItemData[] = [
  { id: 'credits', label: 'Kredite', icon: CreditIcon },
  { id: 'documents', label: 'Dokumente hochladen', icon: DocumentIcon },
  { id: 'personal', label: 'Persönliche Daten', icon: UserIcon, to: '/profile' },
  { id: 'email', label: 'E-Mail ändern', icon: MailIcon },
  { id: 'password', label: 'Kennwort ändern', icon: PasswordIcon },
  { id: 'refer', label: 'Kunden werben', icon: ReferIcon },
  { id: 'logout', label: 'Abmelden', icon: LogoutIcon },
]
