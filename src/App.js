import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'
import LoginPage from './Pages/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
