import React from 'react'
import { Fonts, FontSizes } from '../../GlobalStyles'
import { CommonValidator } from '../../utils/Validator'
import { Colors } from '../../utils/Constants'

interface IBaseTextProps {
  text: string
  style?: React.CSSProperties
}

export const BaseText: React.FC<IBaseTextProps> = ({ text = '', style = {} }: IBaseTextProps) => {
  const firstChar = text !== '' && text != null ? text[0] : 'a'
  const fontFamily = CommonValidator.isPersian(firstChar) ? Fonts.persian.vazir : Fonts.english.openSansRegular
  const fontSize = FontSizes.h3
  const color = Colors.primaryMedium
  const mergedStyles = { fontFamily, fontSize, color, ...style }
  return (
    <span
      style={mergedStyles}
      title={text}
      role="text"
      aria-label={text}
    >
      {text}
    </span>
  )
}
