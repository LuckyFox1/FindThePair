import React from 'react'
import PropTypes from 'prop-types'
import './Counter.scss'

export class Counter extends React.Component {
  render () {
    const { applySettings } = this.props
    return (
      <div className='settings'>
        <div className='delay-time'>
          <p> Time for memorization (sec): </p>
          <input type='number' min='1' max='20' />
        </div>
        <div className='game-time'>
          <p> Game time (sec): </p>
          <input type='number' min='10' max='180' />
        </div>
        <div className='amount-clicks'>
          <p> Amount clicks: </p>
          <input type='number' min='16' max='200' />
        </div>
        <button className='apply-settings button' onClick={applySettings}> Apply</button>
      </div>
    )
  }
}

Counter.propTypes = {
  applySettings: PropTypes.func.isRequired,
}

export default Counter
