/**
 * Backend response format interface (Json-auth-server in this project)
 */
export interface IHttpNetworkPromise {
  data: any
  status: number
  statusText: string
  headers: any
}
