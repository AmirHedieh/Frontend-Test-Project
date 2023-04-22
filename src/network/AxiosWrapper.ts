import axios, { AxiosInstance } from 'axios'
import { NetworkConfig } from '../utils/Constants'
import { GlobalState } from '../utils/GlobalState'

type IType = 'withToken' | 'noToken' | 'fileUpload' | 'mapSearch'

class AxiosWrapper {
  private instance: AxiosInstance = null
  constructor(options: any) {
    this.instance = axios.create(options)
  }
  public get(url: string, data?) {
    return this.instance.get(url, { params: data })
  }
  public post(url: string, data: any) {
    return this.instance.post(url, data)
  }
  public put(url: string, data: any) {
    return this.instance.put(url, data)
  }
  public delete(url: string, data?: any) {
    return this.instance.delete(url, { params: data })
  }
}

export const axiosFactory = (type: IType) => {
  const baseOption = {
    baseURL: NetworkConfig.httpAPIBaseUrl,
    timeout: NetworkConfig.httpRequestTimeout,
    headers: {
      Authorization: `Bearer ${GlobalState.getInstance().getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  switch (type) {
    case 'withToken':
      return new AxiosWrapper(baseOption)
    case 'noToken':
      return new AxiosWrapper(baseOption)
    case 'fileUpload':
      baseOption.headers['Content-Type'] = 'multipart/form-data'
      return new AxiosWrapper(baseOption)
    default:
      return null
  }
}
