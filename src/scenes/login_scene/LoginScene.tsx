import './LoginScene.css'
import { observer } from 'mobx-react'
import { useState, createContext, useContext } from 'react'
import { Stores } from '../..'
import { Localization } from '../../text_process/Localization'

function LoginScene() {
  const uiStore = useContext(Stores).getUIStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
  }

  const handleLanguageChange = (e) => {
    console.log(e.target.value)
    uiStore.setLanguage(e.target.value)
    // Add your selection handler here
  }

  return (
    <div className="container">
      {/* <h1>{uiStore.getLanguage()}</h1> */}
      <div className="language-dropdown">
        <label htmlFor="language-select">Select Language:</label>
        <select
          id="language-select"
          // value={uiStore.getLanguage()}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="fa">Persian</option>
        </select>
      </div>
      <div className="box">
        <h2 className="title">{Localization.translate('email')}</h2>
        <input
          className="input"
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="box">
        <h2 className="title">Password</h2>
        <input
          className="input"
          type="password"
          placeholder="**********"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button
        className="button"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  )
}
export default observer(LoginScene)
