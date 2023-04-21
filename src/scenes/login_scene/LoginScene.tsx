import './LoginScene.css'
import { observer } from 'mobx-react'
import { useState, useContext, createRef } from 'react'
import { Stores } from '../..'
import { Localization } from '../../text_process/Localization'
import { BaseText } from '../../components/base_text/BaseText'
import { EditText } from '../../components/edit_text/EditText'
import { ToggleSwitch } from '../../components/toggle_switch/ToggleSwitch'

function LoginScene() {
  const uiStore = useContext(Stores).getUIStore()

  let emailEditTextRef: EditText = null
  let passwordEditTextRef: EditText = null

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email:', emailEditTextRef.getStandardText())
    console.log('Password:', passwordEditTextRef.getStandardText())
  }

  const handleLanguageChange = (e) => {
    console.log(e.target.value)
    uiStore.setLanguage(e.target.value)
    // Add your selection handler here
  }

  const handleThemeChange = () => {
    uiStore.toggleTheme()
    console.log(uiStore.getTheme())
    // Add your selection handler here
  }

  return (
    <div className="container">
      <ToggleSwitch
        className="theme-switch"
        isOn={uiStore.getTheme() === 'light' ? true : false}
        handleToggle={handleThemeChange}
        onColor="#e0e0e0"
        offColor="#333333"
        onText={Localization.translate('light')}
        offText={Localization.translate('dark')}
      />

      <BaseText text={emailEditTextRef?.getStandardText()} />
      <div className="language-dropdown">
        <label htmlFor="language-select">
          <BaseText text={Localization.translate('selectLanguage')} />
        </label>
        <select
          id="language-select"
          onChange={handleLanguageChange}
        >
          <option value="en">{Localization.translate('en')}</option>
          <option value="fa">{Localization.translate('fa')}</option>
        </select>
      </div>
      <div className="box">
        <h2 className="title">{Localization.translate('email')}</h2>
        <EditText
          ref={(ref) => (emailEditTextRef = ref)}
          className="input"
          type="email"
          required={true}
          placeholder="example@mail.com"
        />
      </div>
      <div className="box">
        <h2 className="title">{Localization.translate('password')}</h2>
        <EditText
          ref={(ref) => (passwordEditTextRef = ref)}
          className="input"
          type="password"
          placeholder="**********"
        />
      </div>
      <button
        className="button"
        onClick={handleSubmit}
      >
        <BaseText
          text={Localization.translate('login')}
          style={{ color: 'white' }}
        />
      </button>
    </div>
  )
}
export default observer(LoginScene)
