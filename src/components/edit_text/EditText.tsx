import React, { useState, useRef } from 'react'
import { Fonts } from '../../GlobalStyles'
import classNames from 'classnames'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'

interface IEditTextProps {
  className?: string
  placeHolder?: string
  onChangeText?: (text: string) => void
  maxLength?: number
  onFocus?: () => void
  onBlur?: () => void
  selectTextOnFocus?: boolean
  initialText?: string
}

export const EditText: React.FC<IEditTextProps> = ({
  className,
  placeHolder,
  onChangeText = () => {},
  maxLength = 20,
  onFocus = () => {},
  onBlur = () => {},
  selectTextOnFocus = false,
  initialText = '',
}) => {
  const [text, setText] = useState<string>(initialText)
  const inputRef = useRef(null)

  const setStateText = (text: string, runCallback: boolean = true) => {
    setText(text)
    if (runCallback) {
      onChangeText(text)
    }
  }

  const firstChar = CommonValidator.isNullOrEmpty(text) ? placeHolder : text

  let fontFamily: string = null
  let direction: string = null

  if (CommonValidator.isPersian(firstChar)) {
    fontFamily = Fonts.persian.vazir
    direction = 'rtl'
  } else {
    fontFamily = Fonts.english.openSansRegular
    direction = 'ltr'
  }

  const textStyle: any = {
    fontFamily,
    direction,
    padding: 0,
  }

  const placeholderText = placeHolder == null ? Localization.translate('textInputPlaceHolder') : placeHolder

  return (
    <input
      ref={inputRef}
      className={classNames('Edittext', className)}
      placeholder={placeholderText}
      value={text}
      onChange={(e) => setStateText(e.target.value)}
      maxLength={maxLength}
      onFocus={onFocus}
      onBlur={onBlur}
      onSelect={() => selectTextOnFocus && inputRef.current.select()}
    />
  )
}
