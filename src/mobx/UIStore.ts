import { makeAutoObservable } from 'mobx'
import { LocalizationLanguages } from '../Types'

export class UIStore {
  private rootStore = null

  private language: LocalizationLanguages
  private theme: theme

  constructor(rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.language = 'en'
    this.theme = 'light'
  }

  public getLanguage(): LocalizationLanguages {
    return this.language
  }

  public setLanguage(lang: LocalizationLanguages): void {
    this.language = lang
  }

  public getTheme(): theme {
    return this.theme
  }

  public toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
}

type theme = 'light' | 'dark'
