import React from 'react'
import { BaseText } from '../base_text/BaseText'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { FontSizes } from '../../GlobalStyles'
import { Colors } from '../../utils/Constants'
import { StylesType } from '../../Types'

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

export const NormalButton: React.FC<INormalButtonProps> = ({
  onClick,
  text,
  disabled,
  containerStyle,
  fontSize,
  width,
  height,
  textStyle,
}) => {
  const extraStyle: React.CSSProperties = {}
  if (width != null) {
    extraStyle.width = width
  }
  if (height != null) {
    extraStyle.height = height
  }
  return (
    <button
      style={Object.assign({}, normalButtonStyles.container, containerStyle, extraStyle)}
      onClick={onClick}
      disabled={disabled}
    >
      <RTLAwareView style={normalButtonStyles.rtlAwareview}>
        <BaseText
          text={text}
          style={Object.assign({}, normalButtonStyles.textStyle, textStyle)}
        />
      </RTLAwareView>
    </button>
  )
}

NormalButton.defaultProps = {
  onClick: () => {},
  text: '',
  disabled: false,
  containerStyle: null,
  fontSize: FontSizes.h3,
  width: null,
  height: null,
  textStyle: null,
}

export const normalButtonStyles: StylesType = {
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
