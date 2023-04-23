import React from 'react'
import { Fonts, FontSizes } from '../../GlobalStyles'
import { CommonValidator } from '../../utils/Validator'
import { Colors } from '../../utils/Constants'

interface IBaseTextProps {
  text: string
  style?: React.CSSProperties
  className?: string
}

export const BaseText: React.FC<IBaseTextProps> = ({ text = '', style = {}, className = '' }: IBaseTextProps) => {
  const firstChar = text !== '' && text != null ? text[0] : 'ا'
  const fontFamily = CommonValidator.isPersian(firstChar) ? Fonts.persian.vazir : Fonts.english.openSansRegular
  const fontSize = FontSizes.h3
  const color = Colors.primaryMedium
  const baseStyle = { 'white-space': 'pre-line', 'text-align': 'center' }
  const mergedStyles = { fontFamily, fontSize, color, ...baseStyle, ...style }
  const mergedClassNames = `BaseText ${className}`
  return (
    <span
      className={mergedClassNames}
      style={mergedStyles}
      title={text}
      role="text"
      aria-label={text}
    >
      {text}
    </span>
  )
}
