import { IHttpNetworkPromise } from './IHttpManager'

import { StatusCodes } from './NetworkConstants'

export class CustomResponse {
  private code
  private message
  private data

  constructor(response: IHttpNetworkPromise) {
    this.code = response.data.status.code
    this.message = response.data.status.message
    this.data = response.data.result
  }

  public isSuccessful() {
    return this.code === StatusCodes.Backend.success
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
