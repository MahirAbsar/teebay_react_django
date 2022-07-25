import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const { userInfo } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <header>
      <Navbar bg='dark' expand='lg' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Teebay</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='text-center'>
            <Nav className='ms-auto'>
              <LinkContainer to='/browse'>
                <Nav.Link>
                  <i className='fa-solid fa-magnifying-glass'></i> Browse
                  Products
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fa-solid fa-cart-shopping me-1'></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <LinkContainer to='/profile'>
                    <Nav.Link>
                      <i className='fa-solid fa-user me-1'></i>
                      {userInfo.name}
                    </Nav.Link>
                  </LinkContainer>

                  <Nav.Link
                    onClick={() => {
                      dispatch(logout())
                      navigate('/login')
                    }}
                  >
                    <i className='fa-solid fa-user me-1'></i>Logout
                  </Nav.Link>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fa-solid fa-user me-1'></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
