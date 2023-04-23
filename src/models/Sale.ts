export interface ISale {
  id: number
  title: string
  address: string
  phoneNumber: string
  description: string
  location: any
  userId: number
}
export interface IRawSale {
  id: number
  title: string
  address: string
  phoneNumber: string
  description: string
  location: any
  userId: number
}

export class SaleFactory {
  public static generateSale(sale: IRawSale): ISale {
    return {
      id: sale.id,
      title: sale.title,
      address: sale.address,
      phoneNumber: sale.phoneNumber,
      description: sale.description,
      location: sale.location,
      userId: sale.userId,
    }
  }
}
