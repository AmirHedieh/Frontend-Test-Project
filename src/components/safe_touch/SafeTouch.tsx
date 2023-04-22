import React, { useState } from 'react'

interface ISafeTouchProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void
  activeOpacity?: number
  disabled?: boolean
  style?: React.CSSProperties
}

export const SafeTouch: React.FC<ISafeTouchProps> = ({ onClick = () => {}, disabled = false, style, children }) => {
  let isTouchValid: boolean = true
  let touchTimeout: any = null

  /**
   * Limit the number of user's clicks by setting a timeout
   * @returns void
   */
  const onPressEvent = (): void => {
    if (isTouchValid === false) {
      return
    }
    isTouchValid = false
    clearTimeoutIfExists()
    touchTimeout = setTimeout(() => {
      isTouchValid = true
    }, 300)
    onClick()
  }

  const clearTimeoutIfExists = (): void => {
    if (touchTimeout != null) {
      clearTimeout(touchTimeout)
      touchTimeout = null
    }
  }

  return (
    <button
      onClick={onPressEvent}
      disabled={disabled}
      style={{ ...Styles.container, ...style }}
    >
      {children}
    </button>
  )
}

const Styles = {
  container: {
    border: 'none',
    minWidth: '24px',
    minHeight: '24px',
    cursor: 'pointer',
  },
}
