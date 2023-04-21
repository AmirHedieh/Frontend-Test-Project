interface IGlobalState {
  token: string
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

  // Setters
  public setToken(token: string): void {
    this.state.token = token
  }

  private restoreDefaultState(): IGlobalState {
    return {
      token: null,
    }
  }
}
