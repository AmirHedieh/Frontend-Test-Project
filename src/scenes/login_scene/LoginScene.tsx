import './LoginScene.css'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { Localization } from '../../text_process/Localization'
import { BaseText } from '../../components/base_text/BaseText'
import { EditText } from '../../components/edit_text/EditText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { FontSizes, GlobalStyles } from '../../GlobalStyles'
import { CommonValidator } from '../../utils/Validator'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { useNavigate } from 'react-router-dom'
import { NormalButton } from '../../components/normal_button/NormalButton'
import { HttpManager } from '../../network/HttpManager'
import { GlobalState } from '../../utils/GlobalState'
import { Loading } from '../../components/loading/Loading'
import { UIController } from '../../components/ui_controller/UIController'

function LoginScene() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  let navigate = useNavigate()
  let emailEditTextRef: EditText = null
  let passwordEditTextRef: EditText = null

  const onLoginButtonClick = async (event): Promise<void> => {
    if (validateInputData(event)) {
      try {
        setIsLoading(true)
        await loginUser()
      } catch (e: any) {
        console.log(e)
        setErrorMessage(e.message)
        setIsLoading(false)
      }
    }
  }

  const loginUser = async (): Promise<void> => {
    const response = await HttpManager.getInstance().login({
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
      CommonValidator.isNullOrEmpty(passwordEditTextRef.getStandardText())
    ) {
      setErrorMessage(Localization.translate('LoginSceneInputEmptyError'))
      return false
    }

    if (!CommonValidator.isEmail(emailEditTextRef.getStandardText())) {
      setErrorMessage(Localization.translate('LoginSceneWrongEmailFormat'))
      return false
    }

    if (!CommonValidator.isPassword(passwordEditTextRef.getStandardText())) {
      setErrorMessage(Localization.translate('LoginSceneWrongPasswordFormat'))
      return false
    }

    setErrorMessage(null)

    return true
  }

  const onNewAccountClick = (): void => {
    navigate('/register')
  }

  return (
    <div className="container">
      {isLoading && <Loading />}

      <UIController />

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
        onClick={onLoginButtonClick}
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
