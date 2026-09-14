import type { ComponentType, SVGProps } from 'react'
import { MaleIcon } from '@/shared/ui/icons'

export interface ProfileRow {
  label: string
  value: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export interface ProfileSection {
  id: string
  title: string
  /** Rows are grouped; groups get extra spacing on tablet and up. */
  groups: ProfileRow[][]
}

export const profileSections: readonly ProfileSection[] = [
  {
    id: 'personal',
    title: 'Persönliche Daten',
    groups: [
      [{ label: 'Anrede', value: 'Herr', icon: MaleIcon }],
      [
        { label: 'Vorname', value: 'John' },
        { label: 'Nachname', value: 'Smith' },
      ],
      [
        { label: 'Geburtsdatum', value: '27.08.1997' },
        { label: 'Geburtsort', value: 'Sindelfingen' },
      ],
      [{ label: 'Mobiltelefon-Nummer', value: '01606112233' }],
      [{ label: 'Staatsbürgerschaft', value: 'Deutschland' }],
    ],
  },
  {
    id: 'family',
    title: 'Familiäre Angaben',
    groups: [
      [
        { label: 'Familienstand', value: 'verheiratet' },
        { label: 'Kinder', value: '2' },
        { label: 'Kindergeld', value: 'Ja' },
      ],
    ],
  },
  {
    id: 'employment',
    title: 'Beschäftigungsdaten',
    groups: [
      [
        { label: 'Beschäftigungsstatus', value: 'Vollzeitanstellung' },
        { label: 'Arbeiten Sie in Kurzarbeit?', value: 'Nein' },
      ],
      [{ label: 'Nettoeinkommen', value: '2380,00 EUR' }],
    ],
  },
]
