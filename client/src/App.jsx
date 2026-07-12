import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/home/Home"
import Auth from "./components/Auth"
import CartPage from "./pages/CartPage"
import CheckoutSuccess from "./pages/CheckoutSuccess"
function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
