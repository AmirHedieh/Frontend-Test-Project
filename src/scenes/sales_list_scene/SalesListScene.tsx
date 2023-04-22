import React, { useState, useEffect, HtmlHTMLAttributes, useContext } from 'react'
import { ISale } from '../../models/Sale'
import { HttpManager } from '../../network/HttpManager'
import { SaleCard } from '../../components/sale_card/SaleCard'
import styles from './SalesListScene.module.css'
import { BaseText } from '../../components/base_text/BaseText'
import { Localization } from '../../text_process/Localization'
import { Stores } from '../..'
import { observer } from 'mobx-react'
import { FontSizes, GlobalStyles } from '../../GlobalStyles'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { TextStandardization } from '../../text_process/TextStandardization'

const SalesListScene: React.FC = () => {
  const uiStore = useContext(Stores).getUIStore()

  const PAGE_LIMIT = 3

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

  let pagiantionArr = Array.from({ length: Math.round(totalPages / PAGE_LIMIT) }, (_, index) => index + 1)
  pagiantionArr = uiStore.getLanguage() === 'en' ? pagiantionArr : pagiantionArr.reverse()

  return (
    <div className={styles['sales-list-container']}>
      <BaseText
        style={salesListSceneStyles.title}
        text={Localization.translate('SalesListSceneTitle')}
      />
      <div style={GlobalStyles.verticalSpacerLarge} />
      {isLoading ? (
        <BaseText text={Localization.translate('loading')} />
      ) : (
        <div className={styles['center-container']}>
          <div className={styles['sales-list']}>
            {sales.map((sale) => (
              <SaleCard
                key={sale.id}
                title={sale.title}
                address={TextStandardization.truncateText(sale.address, 60)}
              />
            ))}
          </div>
          <div style={GlobalStyles.verticalSpacerSmall} />
          <div className={styles['sales-pagination']}>
            {pagiantionArr.map((pageNumber) => (
              <button
                key={pageNumber}
                className={styles['sales-pagination-number']}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const salesListSceneStyles = {
  title: {
    fontWeight: 'bold',
    fontSize: FontSizes.h1,
  },
}

export default observer(SalesListScene)
