export type LocalizationLanguages = 'en' | 'fa'

export interface ILocation {
  lat: number
  lng: number
}

export type sortDirection = 'asc' | 'desc'

export type LocalImage = number | { uri: string }

export type User = {
  id: number
  name: string
  email: string
}
