export interface IHttpNetworkPromise {
  data: {
    status: {
      code: number
      message: string
    }
    result?: any
  }
}
