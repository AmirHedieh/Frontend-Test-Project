import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { RootStore, rootStore } from './mobx/RootStore'

if (
  !new (class {
    x
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const Stores = createContext<RootStore>(rootStore)

root.render(
  <React.StrictMode>
    <Stores.Provider value={rootStore}>
      <App />
    </Stores.Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
