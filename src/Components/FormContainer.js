import React from 'react'
import { Container } from 'react-bootstrap'
function FormContainer({ children }) {
  return (
    <Container className='d-flex w-25 justify-content-md-center py-5 border rounded border-3 mt-5'>
      {children}
    </Container>
  )
}

export default FormContainer
