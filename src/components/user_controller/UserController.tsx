import styles from './UserController.module.css'
import React, { useContext } from 'react'
import { ToggleSwitch } from '../toggle_switch/ToggleSwitch'
import { Stores } from '../..'
import { Localization } from '../../text_process/Localization'
import { BaseText } from '../base_text/BaseText'
import { observer } from 'mobx-react'
import { NormalButton } from '../normal_button/NormalButton'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../utils/GlobalState'

const UserController: React.FC = () => {
  let navigate = useNavigate()

  const logout = (): void => {
    GlobalState.getInstance().setToken(null)
    GlobalState.getInstance().setUser(null)

    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')

    navigate('/login', { replace: true })
  }

  return (
    <div className={styles['button']}>
      <NormalButton
        onClick={logout}
        text={Localization.translate('logout')}
      />
    </div>
  )
}

export default observer(UserController)
