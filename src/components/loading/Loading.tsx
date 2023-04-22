import React from 'react'
import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}></div>
    </div>
  )
}
