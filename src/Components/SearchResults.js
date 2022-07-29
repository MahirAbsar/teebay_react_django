import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
function SearchResults({ products }) {
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
          user,
        } = product
        return (
          <LinkContainer
            key={id}
            to={`/checkout?id=${id}&name=${name}&price=${price}&rentPrice=${rentPrice}&description=${description}&user=${user}&rentDuration=${rentDuration}`}
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
