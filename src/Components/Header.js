import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
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

              {userInfo ? (
                <>
                  <NavDropdown
                    title={userInfo.name}
                    id='navbarScrollingDropdown'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={`${userInfo.name}/products`}>
                      <NavDropdown.Item>My Products</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer to={`/cart/${userInfo.id}`}>
                    <Nav.Link>
                      <i className='fa-solid fa-cart-shopping me-1'></i>My Cart
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
