export type LocalizationLanguages = 'en' | 'fa'

export interface ILocation {
  lat: number
  lng: number
}

export type LocalImage = number | { uri: string }
