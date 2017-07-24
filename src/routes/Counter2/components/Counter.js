import React from 'react'
import PropTypes from 'prop-types'

export const Counter = ({ counter2, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter2: {counter2}</h2>
    <button className='btn btn-primary' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={doubleAsync}>
      Double (Async)
    </button>
  </div>
)
Counter.propTypes = {
  counter2: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Counter
