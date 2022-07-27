import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
function SearchResults({ products }) {
  return (
    <div>
      {products.map((product) => {
        const {
          id,
          name,
          price,
          description,
          category,
          rentPrice,
          rentDuration,
        } = product
        return (
          <LinkContainer
            key={id}
            to={`/updateproduct/${id}`}
            style={{
              border: '2px solid black',
              width: '50rem',
              margin: '0 auto 0 auto',
              cursor: 'pointer',
            }}
          >
            <article className='p-3 rounded my-2'>
              <div className='d-flex justify-content-between align-items-center'>
                <h1 style={{ maxWidth: '15em' }}>{name}</h1>
                <h2>
                  {/* <i
                    className='fa-solid fa-trash'
                    onClick={() => {
                      handleDelete(id)
                    }}
                    style={{ cursor: 'pointer' }}
                  ></i> */}
                </h2>
              </div>
              <h6>Category: {category.join('| ')} </h6>
              <p>Price: {price ? '$' + price : 'Not For Sell'}</p>
              {rentPrice != null ? (
                <p>
                  Rent Price: {rentDuration} ${rentPrice}
                </p>
              ) : (
                <p>
                  <strong>Not Avaialble For Sell</strong>
                </p>
              )}
              <p className='lead'>{description}</p>
            </article>
          </LinkContainer>
        )
      })}
    </div>
  )
}

export default SearchResults
