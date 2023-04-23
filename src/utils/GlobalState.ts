import { User } from '../Types'

interface IGlobalState {
  token: string
  user: User
}

export class GlobalState {
  public static getInstance(): GlobalState {
    if (GlobalState.instance == null) {
      GlobalState.instance = new GlobalState()
    }
    return GlobalState.instance
  }
  private static instance: GlobalState = null
  private state: IGlobalState = this.restoreDefaultState()

  // Getters
  public getToken = (): string => {
    return this.state.token
  }
  public getUser = (): User => {
    return this.state.user
  }

  // Setters
  public setToken(token: string): void {
    this.state.token = token
  }
  public setUser(user: User): void {
    this.state.user = user
  }

  private restoreDefaultState(): IGlobalState {
    return {
      token: null,
      user: null,
    }
  }
}
