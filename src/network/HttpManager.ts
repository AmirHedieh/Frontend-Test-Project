import { ILocation, sortDirection } from '../Types'
import { axiosFactory } from '../network/AxiosWrapper'
import { CustomResponse } from './CustomResponse'

/**
 * HttpManager is a module that provides a set of methods to make HTTP requests to the backend server
 * and return a custom response instance of the response. This module uses axios wrapper for HTTP requests.
 */
export class HttpManager {
  public static getInstance(): HttpManager {
    if (HttpManager.instance == null) {
      HttpManager.instance = new HttpManager()
    }
    return HttpManager.instance
  }

  private static instance: HttpManager = null
  private axiosWithToken = axiosFactory('withToken')
  private axiosNoToken = axiosFactory('noToken')
  private axiosFileUploader = axiosFactory('fileUpload')

  /* example
    public phoneNumberSubmit = async (data: {
        phoneNumber: string
    }): Promise<CustomResponse> => {
        return new CustomResponse(await this.axiosNoToken.post('v1.0/client/user/account', {
            number: data.phoneNumber
        }))
    }
    */

  public login = async (data: { email: string; password: string }): Promise<CustomResponse> => {
    try {
      const response = await this.axiosNoToken.post('login', {
        email: data.email,
        password: data.password,
      })
      return new CustomResponse(response)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response)
        return new CustomResponse(error.response)
      } else {
        // handle other errors here
        throw error
      }
    }
  }

  public register = async (data: { name: string; email: string; password: string }): Promise<CustomResponse> => {
    try {
      const response = await this.axiosNoToken.post('register', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      return new CustomResponse(response)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response)
        return new CustomResponse(error.response)
      } else {
        // handle other errors here
        throw error
      }
    }
  }

  public addSale = async (data: {
    title: string
    address: string
    phoneNumber: string
    description: string
    location: ILocation
    userId: number
  }): Promise<CustomResponse> => {
    try {
      const response = await this.axiosWithToken.post(`sales`, data)
      return new CustomResponse(response)
    } catch (error: any) {
      if (error.response) {
        return new CustomResponse(error.response)
      } else {
        // handle other errors here
        throw error
      }
    }
  }

  public getSales = async (params: {
    _page?: number
    _limit?: number
    _sort?: string
    _order?: sortDirection
  }): Promise<CustomResponse> => {
    try {
      return new CustomResponse(await this.axiosWithToken.get(`sales`, params))
    } catch (error: any) {
      if (error.response) {
        console.log(error.response)
        return new CustomResponse(error.response)
      } else {
        // handle other errors here
        throw error
      }
    }
  }
}
