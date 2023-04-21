import React from 'react'
import './ToggleSwitch.css'
import { BaseText } from '../base_text/BaseText'
import classNames from 'classnames'
import { FontSizes } from '../../GlobalStyles'

interface IToggleSwitchProps {
  className?: string
  isOn: boolean
  handleToggle: () => void
  offColor?: string
  onColor?: string
  offText?: string
  onText?: string
}

export const ToggleSwitch: React.FC<IToggleSwitchProps> = ({
  className,
  isOn,
  handleToggle,
  offColor,
  onColor,
  onText,
  offText,
}) => {
  const textColor: string = isOn ? '#333333' : '#e0e0e0'
  return (
    <div className={className}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={classNames('react-switch-checkbox')}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? onColor : offColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
        {!isOn && <div style={{ flex: 1 }} />}
        <BaseText
          style={{ paddingLeft: 12, paddingRight: 12, color: textColor, fontSize: 12, userSelect: 'none' }}
          text={isOn ? onText : offText}
        />
        {isOn && <div style={{ flex: 1 }} />}
      </label>
    </div>
  )
}

ToggleSwitch.defaultProps = {
  isOn: false,
  offColor: 'grey',
  onColor: '#06D6A0',
}
