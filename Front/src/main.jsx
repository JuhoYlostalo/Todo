import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screens/App.jsx'
import Authentication, {AuthenticationMode} from './screens/Authentication.jsx'
import ProtectedRoute from "./components/ProtectedRouter.jsx"
import UserProvider from "./context/UserProvider.jsx"
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from './screens/NotFound.jsx'

const router = createBrowserRouter([
  {
    errorElement: <NotFound></NotFound>
  },
  {
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.SignIn}></Authentication>
  },
  {
    path: "/signup",
    element: <Authentication authenticationMode={AuthenticationMode.SignUp}></Authentication>
  },
  {
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <App></App>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </StrictMode>,
)
