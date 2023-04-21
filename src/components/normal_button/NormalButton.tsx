import React from 'react'
import { BaseText } from '../base_text/BaseText'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'
import { Colors } from '../../utils/Constants'

interface INormalButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: any
  text: string
  disabled?: boolean
  containerStyle?: React.CSSProperties
  fontSize?: number
  width?: number | string
  height?: number | string
  textStyle?: React.CSSProperties
}

export class NormalButton extends React.Component<INormalButtonProps> {
  public static defaultProps: INormalButtonProps = {
    onClick: () => {},
    text: '',
    disabled: false,
    containerStyle: null,
    fontSize: FontSizes.h3,
    width: null,
    height: null,
    textStyle: null,
  }

  public render(): JSX.Element {
    const extraStyle: React.CSSProperties = {}
    if (this.props.width != null) {
      extraStyle.width = this.props.width
    }
    if (this.props.height != null) {
      extraStyle.height = this.props.height
    }
    return (
      <button
        style={Object.assign({}, Styles.container, this.props.containerStyle, extraStyle)}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        <RTLAwareView style={Styles.rtlAwareview}>
          <BaseText
            text={this.props.text}
            style={Object.assign({}, Styles.textStyle, this.props.textStyle)}
          />
        </RTLAwareView>
      </button>
    )
  }
}

export const Styles = {
  container: {
    border: 'none',
    outline: 'none',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#5e5e5e',
    color: 'white',
    borderRadius: '50px',
    width: 'auto',
    minWidth: '100px',
    marginTop: '20px',
    cursor: 'pointer',
  },
  rtlAwareview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: FontSizes.h3,
    color: Colors.pureWhite,
  },
}
