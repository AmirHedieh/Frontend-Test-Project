import styles from './SaleCard.module.css'
import React from 'react'
import { BaseText } from '../base_text/BaseText'

interface ISaleCardProps {
  title: string
  address: string
}

export const SaleCard: React.FC<ISaleCardProps> = ({ title, address }) => {
  return (
    <div className={styles['card']}>
      <div className={styles['card-title']}>
        <BaseText text={title} />
      </div>
      <div className={styles['card-address']}>
        <BaseText text={address} />
      </div>
    </div>
  )
}
