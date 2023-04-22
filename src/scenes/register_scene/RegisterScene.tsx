import './RegisterScene.css'
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
import { NormalButton } from '../../components/normal_button/NormalButton'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { useNavigate } from 'react-router-dom'
import { HttpManager } from '../../network/HttpManager'
import { Loading } from '../../components/loading/Loading'
import { GlobalState } from '../../utils/GlobalState'

function RegisterScene() {
  const uiStore = useContext(Stores).getUIStore()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  let navigate = useNavigate()
  let nameEditTextRef: EditText = null
  let emailEditTextRef: EditText = null
  let passwordEditTextRef: EditText = null

  const onRegisterButtonClick = async (event): Promise<void> => {
    if (validateInputData(event)) {
      try {
        setIsLoading(true)
        await registerUser()
      } catch (e: any) {
        setErrorMessage(e.message)
        setIsLoading(false)
      }
    }
  }

  const registerUser = async (): Promise<void> => {
    const response = await HttpManager.getInstance().register({
      name: nameEditTextRef.getStandardText(),
      email: emailEditTextRef.getStandardText(),
      password: passwordEditTextRef.getStandardText(),
    })
    setIsLoading(false)
    if (response.isSuccessful()) {
      GlobalState.getInstance().setToken(response.getData().accessToken)
      GlobalState.getInstance().setUser(response.getData().user)
      navigate('/sales', { replace: true })
    } else {
      setErrorMessage(response.getData())
    }
  }

  const validateInputData = (event): boolean => {
    event.preventDefault()

    if (
      CommonValidator.isNullOrEmpty(emailEditTextRef.getStandardText()) ||
      CommonValidator.isNullOrEmpty(passwordEditTextRef.getStandardText()) ||
      CommonValidator.isNullOrEmpty(nameEditTextRef.getStandardText())
    ) {
      setErrorMessage(Localization.translate('RegisterSceneInputEmptyError'))
      return false
    }

    if (!CommonValidator.isEmail(emailEditTextRef.getStandardText())) {
      setErrorMessage(Localization.translate('RegisterSceneWrongEmailFormat'))
      return false
    }

    if (!CommonValidator.isPassword(passwordEditTextRef.getStandardText())) {
      setErrorMessage(Localization.translate('RegisterSceneWrongPasswordFormat'))
      return false
    }

    setErrorMessage(null)
    return true
  }

  const handleLanguageChange = (e): void => {
    uiStore.setLanguage(e.target.value)
  }

  const handleThemeChange = (): void => {
    uiStore.toggleTheme()
  }

  const onHaveAccountClick = (): void => {
    navigate('/login')
  }

  return (
    <div className="container">
      {isLoading && <Loading />}

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
          value={uiStore.getLanguage()}
        >
          <option value="en">{Localization.translate('en')}</option>
          <option value="fa">{Localization.translate('fa')}</option>
        </select>
      </div>

      <BaseText
        style={styles.pageTitle}
        text={Localization.translate('RegisterSceneRegister')}
      />
      <div style={GlobalStyles.verticalSpacerLarge} />
      {/* User input boxes */}
      <div>
        <RTLAwareView style={styles.editTextTitleContainer}>
          <BaseText
            style={styles.editTextTitle}
            text={Localization.translate('RegisterSceneName')}
          />
          <div style={GlobalStyles.spacer} />
        </RTLAwareView>
        <div style={GlobalStyles.verticalSpacerSmall} />
        <div className="edittext">
          <EditText
            ref={(ref) => (nameEditTextRef = ref)}
            className="input"
            type="text"
            maxLength={72}
            required={true}
            placeholder="Amir Hedieh"
          />
        </div>
      </div>
      <div style={GlobalStyles.verticalSpacerLarge} />
      <div>
        <RTLAwareView style={styles.editTextTitleContainer}>
          <BaseText
            style={styles.editTextTitle}
            text={Localization.translate('RegisterSceneEmail')}
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
            text={Localization.translate('RegisterScenePassword')}
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
        onClick={onRegisterButtonClick}
        text={Localization.translate('RegisterSceneRegister')}
      />
      <div style={GlobalStyles.verticalSpacerSmall} />
      <SafeTouch
        className="have-account-button"
        onClick={onHaveAccountClick}
      >
        <BaseText
          style={styles.haveAccountText}
          text={Localization.translate('RegisterSceneHaveAccount')}
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
  haveAccountText: {
    fontSize: FontSizes.extraSmall,
    textDecoration: 'underline',
  },
}

export default observer(RegisterScene)
