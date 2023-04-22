import { axiosFactory } from '../network/AxiosWrapper'
import { CustomResponse } from './CustomResponse'

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

  public getMuseum = async (urlParams: { museumId: number }): Promise<CustomResponse> => {
    return new CustomResponse(await this.axiosNoToken.get(`museums/${urlParams.museumId}`))
  }

  public updateMuseum = async (
    urlParams: {
      museumId: number
    },
    params: {
      phoneNumber?: string
      name?: string
      picture?: string
      information?: string
      website?: string
      instagram?: string
      twitter?: string
    }
  ): Promise<CustomResponse> => {
    return new CustomResponse(await this.axiosWithToken.put(`museums/${urlParams.museumId}`, params))
  }

  public uploadMuseumImage = async (urlParams: { museumId: number }, data: FormData): Promise<CustomResponse> => {
    return new CustomResponse(await this.axiosFileUploader.post(`museums/${urlParams.museumId}/museum_picture`, data))
  }

  public getProducts = async (urlParams: { museumId: number; productId?: number }): Promise<CustomResponse> => {
    var url = `museums/${urlParams.museumId}/products/`
    if (urlParams.productId) {
      url += urlParams.productId
    }
    return new CustomResponse(await this.axiosNoToken.get(url))
  }

  public createProduct = async (
    urlParams: { museumId: number },
    params: {
      name: string
      creator: string
      creation_time: string
      description: string
    }
  ): Promise<CustomResponse> => {
    return new CustomResponse(await this.axiosWithToken.post(`museums/${urlParams.museumId}/products`, params))
  }

  public updateProduct = async (
    urlParams: { museumId: number; productId: number },
    params: {
      name: string
      creator: string
      creation_time: string
      description: string
    }
  ): Promise<CustomResponse> => {
    console.log('url update', `museums/${urlParams.museumId}/products/${urlParams.productId}`)
    console.log('params', params)
    return new CustomResponse(
      await this.axiosWithToken.put(`museums/${urlParams.museumId}/products/${urlParams.productId}`, params)
    )
  }

  public deleteProduct = async (urlParams: { museumId: number; productId: number }): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosWithToken.delete(`museums/${urlParams.museumId}/products/${urlParams.productId}`)
    )
  }

  public uploadProductPicture = async (
    urlParams: { museumId: number; productId: number },
    data: FormData
  ): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosFileUploader.post(
        `museums/${urlParams.museumId}/products/${urlParams.productId}/product_pictures`,
        data
      )
    )
  }

  public deleteProductPicture = async (urlParams: {
    museumId: number
    productId: number
    pictureId: number
  }): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosFileUploader.delete(
        `museums/${urlParams.museumId}/products/${urlParams.productId}/product_pictures/${urlParams.pictureId}`
      )
    )
  }

  public createComment = async (
    urlParams: { museumId: number; productId: number },
    params: {
      commentor: string
      text: string
    }
  ): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosNoToken.post(`museums/${urlParams.museumId}/products/${urlParams.productId}/comments/`, params)
    )
  }

  public getComments = async (urlParams: {
    museumId: number
    productId: number
    commentId?: number
  }): Promise<CustomResponse> => {
    var url = `museums/${urlParams.museumId}/products/${urlParams.productId}/comments/`
    if (urlParams.commentId) {
      url += urlParams.commentId
    }
    console.log('url', url)
    return new CustomResponse(await this.axiosNoToken.get(url))
  }

  public deleteComment = async (urlParams: {
    museumId: number
    productId: number
    commentId: number
  }): Promise<CustomResponse> => {
    var url = `museums/${urlParams.museumId}/products/${urlParams.productId}/comments/${urlParams.commentId}`
    return new CustomResponse(await this.axiosWithToken.delete(url))
  }

  public createAttribute = async (
    urlParams: { museumId: number; productId: number },
    params: {
      title: string
      description: string
    }
  ): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosWithToken.post(`museums/${urlParams.museumId}/products/${urlParams.productId}/attributes`, params)
    )
  }

  public updateAttribute = async (
    urlParams: { museumId: number; productId: number; attributeId: number },
    params: {
      title?: string
      description?: string
    }
  ): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosWithToken.put(
        `museums/${urlParams.museumId}/products/${urlParams.productId}/attributes/${urlParams.attributeId}`,
        params
      )
    )
  }

  public deleteAttribute = async (urlParams: {
    museumId: number
    productId: number
    attributeId: number
  }): Promise<CustomResponse> => {
    return new CustomResponse(
      await this.axiosWithToken.delete(
        `museums/${urlParams.museumId}/products/${urlParams.productId}/attributes/${urlParams.attributeId}`
      )
    )
  }

  public getBeacons = async (params: { major?: number; minor?: number }): Promise<CustomResponse> => {
    return new CustomResponse(await this.axiosNoToken.get(`beacons`, params))
  }

  // public uploadPhoto = async (data: FormData): Promise<CustomResponse> => {
  //     return new CustomResponse(await this.axiosFileUploader.post('http/v1.0/common/file/picture', data))
  // }
}
