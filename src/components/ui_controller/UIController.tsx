import React, { useContext } from 'react'
import { ToggleSwitch } from '../toggle_switch/ToggleSwitch'
import { Stores } from '../..'
import { Localization } from '../../text_process/Localization'
import { BaseText } from '../base_text/BaseText'
import { observer } from 'mobx-react'

const UIController: React.FC = () => {
  const uiStore = useContext(Stores).getUIStore()

  const handleLanguageChange = (e): void => {
    uiStore.setLanguage(e.target.value)
  }

  const handleThemeChange = (): void => {
    uiStore.toggleTheme()
  }

  return (
    <div>
      <ToggleSwitch
        className="theme-switch"
        isOn={uiStore.getTheme() === 'light' ? true : false}
        handleToggle={handleThemeChange}
        onColor="#e0e0e0"
        offColor="#333333"
        onText={Localization.translate('light')}
        offText={Localization.translate('dark')}
      />

      <div className="language-dropdown">
        <label htmlFor="language-select">
          <BaseText text={Localization.translate('selectLanguage')} />
        </label>
        <select
          id="language-select"
          onChange={handleLanguageChange}
          value={uiStore.getLanguage()}
        >
          <option value="en">{Localization.translate('en')}</option>
          <option value="fa">{Localization.translate('fa')}</option>
        </select>
      </div>
    </div>
  )
}

export default observer(UIController)
