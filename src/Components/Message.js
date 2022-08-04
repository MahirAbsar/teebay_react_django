import React from 'react'

function Message({ text, type }) {
  const styles = {
    color: type == 'failure' ? 'red' : 'success',
    backgroundColor: type == 'failure' ? '#ff8d8d' : '#aeffe1',
    padding: '0.75rem',
    borderRadius: '20px',
  }
  return (
    <div className='message-container'>
      <p style={styles}>{text}</p>
    </div>
  )
}

export default Message
