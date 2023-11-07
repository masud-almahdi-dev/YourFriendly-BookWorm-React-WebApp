import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import Routes from './layout/Routes';
import AuthProvider from './authentication/Authentication';
import { DarkmodeProvider } from './darkmode/darkMode';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DarkmodeProvider>
        <RouterProvider router={Routes} />
      </DarkmodeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
