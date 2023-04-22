import React, { useState, useEffect, HtmlHTMLAttributes } from 'react'
import { ISale } from '../../models/Sale'
import { HttpManager } from '../../network/HttpManager'
import { SaleCard } from '../../components/sale_card/SaleCard'
import { Loading } from '../../components/loading/Loading'

export const SalesListScene: React.FC = () => {
  const PAGE_LIMIT = 2

  const [sales, setSales] = useState<ISale[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log('use effect')
    const fetchSales = async () => {
      setIsLoading(true)
      const response = await HttpManager.getInstance().getSales({ _page: page, _limit: PAGE_LIMIT })
      setIsLoading(false)
      if (response.isSuccessful()) {
        console.log(response)
        setSales(response.getData())
        setTotalPages(response.getHeaders()['x-total-count'])
      } else {
        console.log(response.getData())
      }
    }
    fetchSales()
  }, [page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {sales.map((sale) => (
            <SaleCard
              key={sale.id}
              title={sale.title}
              address={sale.address}
            />
          ))}
          <div>
            {Array.from({ length: Math.round(totalPages / PAGE_LIMIT) }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
