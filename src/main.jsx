import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import xhrOverwrite from './utils/xhr-overwrite'

xhrOverwrite()

ReactDOM.createRoot(
  (() => {
    const app = document.createElement('div')
    document.body.append(app)
    return app
  })()
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
