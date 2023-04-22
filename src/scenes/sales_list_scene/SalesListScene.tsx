import React, { useState, useEffect, HtmlHTMLAttributes, useContext } from 'react'
import { ISale } from '../../models/Sale'
import { HttpManager } from '../../network/HttpManager'
import { SaleCard } from '../../components/sale_card/SaleCard'
import './SalesListScene.css'
import { BaseText } from '../../components/base_text/BaseText'
import { Localization } from '../../text_process/Localization'
import { Stores } from '../..'
import { observer } from 'mobx-react'

const SalesListScene: React.FC = () => {
  const uiStore = useContext(Stores).getUIStore()

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
    <div className="sales-list-container">
      <BaseText text={Localization.translate('SalesListSceneTitle')} />
      <h1 className="sales-list-title">Sales List</h1>
      {isLoading ? (
        <BaseText text={Localization.translate('loading')} />
      ) : (
        <>
          <div className="sales-list">
            {sales.map((sale) => (
              <SaleCard
                key={sale.id}
                title={sale.title}
                address={sale.address}
              />
            ))}
          </div>
          <div className="sales-pagination">
            {Array.from({ length: Math.round(totalPages / PAGE_LIMIT) }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className="sales-pagination-number"
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

export default observer(SalesListScene)
