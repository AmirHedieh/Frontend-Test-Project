import React, { useState, useRef, useEffect } from 'react'
import { Fonts } from '../../GlobalStyles'
import classNames from 'classnames'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { TextStandardization } from '../../text_process/TextStandardization'

interface IEditTextProps {
  className?: string
  type: string
  placeholder?: string
  onChangeText?: (text: string) => void
  maxLength?: number
  onFocus?: () => void
  onBlur?: () => void
  selectTextOnFocus?: boolean
  initialText?: string
}

export class EditText extends React.PureComponent<IEditTextProps> {
  public static defaultProps: IEditTextProps = {
    className: '',
    type: null,
    placeholder: null,
    onChangeText: () => {},
    maxLength: 20,
    onFocus: () => {},
    onBlur: () => {},
    selectTextOnFocus: false,
    initialText: '',
  }

  public state = {
    text: '',
  }

  private inputRef: HTMLInputElement = null

  public constructor(props: IEditTextProps) {
    super(props)
    this.setStateText = this.setStateText.bind(this)
    this.getStandardText = this.getStandardText.bind(this)
    this.state.text = this.props.initialText
  }

  public getStandardText(): string {
    return TextStandardization.transformArabic(TextStandardization.transformNumbers(this.state.text))
  }

  public setStateText(text: string, runCallback: boolean = true) {
    this.setState({ text }, () => {
      if (runCallback) {
        this.props.onChangeText(text)
      }
    })
  }

  public render(): JSX.Element {
    const firstChar = CommonValidator.isNullOrEmpty(this.state.text) ? this.props.placeholder : this.state.text

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

    const placeholderText =
      this.props.placeholder == null ? Localization.translate('textInputPlaceHolder') : this.props.placeholder

    return (
      <input
        ref={(ref) => (this.inputRef = ref)}
        className={classNames('Edittext', this.props.className)}
        type={this.props.type}
        value={this.state.text}
        placeholder={placeholderText}
        onChange={(e) => this.setStateText(e.target.value)}
        maxLength={this.props.maxLength}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onSelect={() => this.props.selectTextOnFocus && this.inputRef.select()}
      />
    )
  }
}
