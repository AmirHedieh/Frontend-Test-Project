import React from 'react'
import './SaleCard.css'
import { BaseText } from '../base_text/BaseText'

interface ISaleCardProps {
  title: string
  address: string
}

export const SaleCard: React.FC<ISaleCardProps> = ({ title, address }) => {
  return (
    <div className="card">
      <div className="card-title">
        <BaseText text={title} />
      </div>
      <div className="card-address">
        <BaseText text={address} />
      </div>
    </div>
  )
}
