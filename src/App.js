import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/products'
              element={
                <>
                  <h1>Products</h1>
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
