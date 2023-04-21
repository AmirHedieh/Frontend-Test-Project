import './LoginScene.css'
import { observer } from 'mobx-react'
import { useState, useContext, createRef } from 'react'
import { Stores } from '../..'
import { Localization } from '../../text_process/Localization'
import { BaseText } from '../../components/base_text/BaseText'
import { EditText } from '../../components/edit_text/EditText'
import { ToggleSwitch } from '../../components/toggle_switch/ToggleSwitch'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { FontSizes, GlobalStyles } from '../../GlobalStyles'

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
      {/* UI control elements like language and theme */}

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
        >
          <option value="en">{Localization.translate('en')}</option>
          <option value="fa">{Localization.translate('fa')}</option>
        </select>
      </div>

      {/* User input boxes */}
      <div>
        <RTLAwareView style={styles.editTextTitleContainer}>
          <BaseText
            style={styles.editTextTitle}
            text={Localization.translate('email')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className="edittext">
          <EditText
            ref={(ref) => (emailEditTextRef = ref)}
            className="input"
            type="email"
            maxLength={72}
            required={true}
            placeholder="example@mail.com"
          />
        </div>
      </div>
      <div style={GlobalStyles.verticalSpacerLarge} />
      <div>
        <RTLAwareView style={styles.editTextTitleContainer}>
          <BaseText
            style={styles.editTextTitle}
            text={Localization.translate('password')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className="edittext">
          <EditText
            ref={(ref) => (passwordEditTextRef = ref)}
            className="input"
            type="password"
            placeholder="**********"
          />
        </div>
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

const styles = {
  editTextTitle: {
    fontSize: FontSizes.p,
    fontWeight: 'bold',
  },
  editTextTitleContainer: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
}

export default observer(LoginScene)
