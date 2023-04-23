import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RootStore, rootStore } from './mobx/RootStore'
import LoginScene from './scenes/login_scene/LoginScene'
import RegisterScene from './scenes/register_scene/RegisterScene'
import SalesListScene from './scenes/sales_list_scene/SalesListScene'
import UIController from './components/ui_controller/UIController'
import AddSaleScene from './scenes/add_sale_scene/AddSaleScene'
import { GlobalState } from './utils/GlobalState'
import SaleDataScene from './scenes/sale_data_scene/SaleDataScene'

if (
  !new (class {
    x
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const Stores = createContext<RootStore>(rootStore)

const storedAccessToken = localStorage.getItem('accessToken')
const storedUser = localStorage.getItem('user')

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
  {
    path: '/sales',
    element: <SalesListScene />,
  },
  {
    path: '/add-sale',
    element: <AddSaleScene />,
  },
  {
    path: '/sales/:id',
    element: <SaleDataScene />,
  },
])

if (storedAccessToken && storedUser) {
  // Set the user data in GlobalState
  GlobalState.getInstance().setToken(storedAccessToken)
  GlobalState.getInstance().setUser(JSON.parse(storedUser))
}

{
  /** disable <React.StrictMode> to avoid components double render */
}
root.render(
  <React.StrictMode>
    <Stores.Provider value={rootStore}>
      <UIController />
      <RouterProvider router={router} />
    </Stores.Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
