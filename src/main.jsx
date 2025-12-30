import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById('root')).render(
<StrictMode>
    <PayPalScriptProvider
    options={{ "client-id": "AaCEloe3iX1RooqhEV-b5KnHcpmOTLKI1hIpPvnGwZseIx1KiwtnCof-hnpZBjYxEtpyGrtYXeb5brQw" }}
  >
    <App />
  </PayPalScriptProvider>
  </StrictMode>,
)
