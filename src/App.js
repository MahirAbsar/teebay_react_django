import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
