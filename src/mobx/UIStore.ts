import { makeAutoObservable, observable, computed } from 'mobx'

export class UIStore {
  private rootStore = null

  private language: language
  private theme: theme

  constructor(rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.language = 'en'
    this.theme = 'light'
  }

  public getLanguage(): language {
    return this.language
  }

  public setLanguage(lang: 'fa' | 'en'): void {
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
type language = 'en' | 'fa'
