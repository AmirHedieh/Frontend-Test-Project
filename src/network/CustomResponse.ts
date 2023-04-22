import { IHttpNetworkPromise } from './IHttpManager'

import { StatusCodes } from './NetworkConstants'

export class CustomResponse {
  private code
  private message
  private data

  constructor(response: IHttpNetworkPromise) {
    this.code = response.status
    this.message = response.statusText
    this.data = response.data
  }

  public isSuccessful() {
    return StatusCodes.Http.successCodes.includes(this.code)
  }
  public getCode() {
    return this.code
  }
  public getMessage() {
    return this.message
  }
  public getData() {
    return this.data
  }
}
