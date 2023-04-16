import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.less'
import 'antd/dist/antd.css'
import ColorContext from './context/colorContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ColorContext>
      <App/>
    </ColorContext>
  </React.StrictMode>
)
