import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/home/Home"
import Auth from "./components/Auth"
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
