import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'
import LoginPage from './Pages/LoginPage'
import BrowseProducts from './Pages/BrowseProducts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import UpdateUser from './Pages/UpdateUser'
import MyProducts from './Pages/MyProducts'
import { useSelector } from 'react-redux'
import ModalComponent from './Components/ModalComponent'
import AddProduct from './Pages/AddProduct'
function App() {
  const { isOpen } = useSelector((store) => store.modal)
  return (
    <>
      <BrowserRouter>
        {isOpen && <ModalComponent />}
        <Header />
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/browse' element={<BrowseProducts />} />
            <Route path='/:name/products' element={<MyProducts />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/profile' element={<UpdateUser />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
