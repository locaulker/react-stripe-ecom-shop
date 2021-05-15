import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Result from "./pages/Result"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

// prefix with 'REACT_APP_' (when using .env)

const stripePromise = loadStripe(
  "pk_test_51IrONUDqO0MmNLNvbV7UXtZr1pNhOaxj6uANuDg1Pnxk7zis3Rb1X3dFB1ADM1mxe0RrcmX7xMqGVWwzpaxMeCkF00Res8rch0"
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currency="USD"
      >
        <BrowserRouter>
          <Toaster position="bottom-center" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/:productId" component={Product} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
