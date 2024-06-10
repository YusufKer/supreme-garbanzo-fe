import React from 'react'
import ReactDOM from 'react-dom/client'

//CONTEXT
import { ProductContextProvider } from './context/ProductsContext.tsx'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </React.StrictMode>,
)
