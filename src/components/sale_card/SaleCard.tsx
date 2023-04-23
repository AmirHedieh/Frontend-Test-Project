import styles from './SaleCard.module.css'
import React from 'react'
import { BaseText } from '../base_text/BaseText'
import { FontSizes, GlobalStyles } from '../../GlobalStyles'
import { StylesType } from '../../Types'

interface ISaleCardProps {
  title: string
  address: string
}

export const SaleCard: React.FC<ISaleCardProps> = ({ title, address }) => {
  return (
    <div className={styles['card']}>
      <div className={styles['card-title']}>
        <BaseText
          style={saleCardStyles.title}
          text={title}
        />
      </div>
      <div style={GlobalStyles.verticalSpacerSmall} />
      <div className={styles['line-separator']} />
      <div style={GlobalStyles.verticalSpacerSmall} />
      <div className={styles['card-address']}>
        <BaseText
          style={saleCardStyles.address}
          text={address}
        />
      </div>
    </div>
  )
}

const saleCardStyles: StylesType = {
  title: {
    fontWeight: 'bold',
  },
  address: {
    fontSize: FontSizes.p,
  },
}
