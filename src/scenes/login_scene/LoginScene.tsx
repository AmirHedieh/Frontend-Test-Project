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
import { CommonValidator } from '../../utils/Validator'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { useNavigate } from 'react-router-dom'
import { NormalButton } from '../../components/normal_button/NormalButton'

function LoginScene() {
  const uiStore = useContext(Stores).getUIStore()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  let navigate = useNavigate()
  let emailEditTextRef: EditText = null
  let passwordEditTextRef: EditText = null

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      CommonValidator.isNullOrEmpty(emailEditTextRef.getStandardText()) ||
      CommonValidator.isNullOrEmpty(passwordEditTextRef.getStandardText())
    ) {
      setErrorMessage(Localization.translate('LoginSceneInputEmptyError'))
      return
    }

    if (!CommonValidator.isEmail(emailEditTextRef.getStandardText())) {
      setErrorMessage(Localization.translate('LoginSceneWrongEmailFormat'))
      return
    }

    if (!CommonValidator.isPassword(passwordEditTextRef.getStandardText())) {
      setErrorMessage(Localization.translate('LoginSceneWrongPasswordFormat'))
      return
    }

    setErrorMessage(null)

    console.log('Email:', emailEditTextRef.getStandardText())
    console.log('Password:', passwordEditTextRef.getStandardText())
  }

  const handleLanguageChange = (e) => {
    uiStore.setLanguage(e.target.value)
  }

  const handleThemeChange = () => {
    uiStore.toggleTheme()
  }

  const onNewAccountClick = () => {
    navigate('/register')
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

      <BaseText
        style={styles.pageTitle}
        text={Localization.translate('LoginSceneLogin')}
      />
      <div style={GlobalStyles.verticalSpacerLarge} />
      {/* User input boxes */}
      <div>
        <RTLAwareView style={styles.editTextTitleContainer}>
          <BaseText
            style={styles.editTextTitle}
            text={Localization.translate('LoginSceneEmail')}
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
            text={Localization.translate('LoginScenePassword')}
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
      <div style={GlobalStyles.verticalSpacerMedium} />
      {errorMessage && (
        <BaseText
          style={styles.inputError}
          text={errorMessage}
        />
      )}
      <NormalButton
        onClick={handleSubmit}
        text={Localization.translate('LoginSceneLogin')}
      />
      <SafeTouch
        className="have-account-button"
        onClick={onNewAccountClick}
      >
        <div style={GlobalStyles.verticalSpacerSmall} />
        <BaseText
          style={styles.newAccountText}
          text={Localization.translate('LoginSceneNewAccount')}
        />
      </SafeTouch>
    </div>
  )
}

const styles = {
  pageTitle: {
    fontSize: FontSizes.h1,
    fontWeight: 'bold',
  },
  editTextTitle: {
    fontSize: FontSizes.p,
    fontWeight: 'bold',
  },
  editTextTitleContainer: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  inputError: {
    color: 'red',
    fontSize: FontSizes.p,
  },
  newAccountText: {
    fontSize: FontSizes.extraSmall,
    textDecoration: 'underline',
  },
}

export default observer(LoginScene)
