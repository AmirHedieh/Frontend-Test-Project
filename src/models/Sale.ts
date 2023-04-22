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
  phone_number: string
  description: string
  location: any
  user_id: number
}

export class SaleFactory {
  public static generateSale(sale: IRawSale): ISale {
    return {
      id: sale.id,
      title: sale.title,
      address: sale.address,
      phoneNumber: sale.phone_number,
      description: sale.description,
      location: sale.location,
      userId: sale.user_id,
    }
  }
}
