import { UIStore } from './UIStore'

export class RootStore {
  private uiStore: UIStore = null

  constructor() {
    this.uiStore = new UIStore(this)
  }

  public getUIStore(): UIStore {
    return this.uiStore
  }
}

export const rootStore: RootStore = new RootStore()
