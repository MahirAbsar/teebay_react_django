import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function SearchResults({ products }) {
  // For Date Formatting
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const [isVisible, setIsVisible] = useState(2)
  const handleLoadMore = () => {
    setIsVisible((oldState) => oldState + 1)
  }
  return (
    <div>
      {products.slice(0, isVisible).map((product) => {
        const {
          id,
          name,
          price,
          description,
          category,
          rentPrice,
          rentDuration,
          createdAt,
          user,
        } = product
        return (
          <LinkContainer
            className='border border-3'
            key={id}
            to={`/checkout?id=${id}&name=${name}&price=${price}&rentPrice=${rentPrice}&description=${description}&user=${user}&rentDuration=${rentDuration}`}
            style={{
              width: '50rem',
              margin: '0 auto 0 auto',
              cursor: 'pointer',
            }}
          >
            <article className='p-3 rounded my-2'>
              <div className='d-flex justify-content-between align-items-center'>
                <h1 style={{ maxWidth: '15em' }}>{name}</h1>
              </div>
              <h6>Category: {category.join('| ')} </h6>
              <p>Price: {price}</p>

              <p>
                Rent Price: {rentDuration} ${rentPrice}
              </p>
              <p>
                Posted At:
                {new Date(createdAt).toLocaleDateString('en-US', options)}
              </p>
            </article>
          </LinkContainer>
        )
      })}

      <Button
        color='primary'
        style={{ display: 'block', margin: '10px auto' }}
        onClick={handleLoadMore}
      >
        Load More
      </Button>
    </div>
  )
}

export default SearchResults
