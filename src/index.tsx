import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { RootStore, rootStore } from './mobx/RootStore'
import LoginScene from './scenes/login_scene/LoginScene'
import RegisterScene from './scenes/register_scene/RegisterScene'

if (
  !new (class {
    x
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const Stores = createContext<RootStore>(rootStore)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/register'} />,
  },
  {
    path: '/register',
    element: <RegisterScene />,
  },
  {
    path: '/login',
    element: <LoginScene />,
  },
])

root.render(
  <React.StrictMode>
    <Stores.Provider value={rootStore}>
      <RouterProvider router={router} />
    </Stores.Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
