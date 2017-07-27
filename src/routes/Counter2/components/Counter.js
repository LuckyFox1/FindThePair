import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './Counter.scss'

export class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.props.resetSettings()
  }
  render () {
    const { applySettings, changeDelayTime, changeGameTime, changeAmountClicks, counter2 } = this.props
    return (
      <div className='settings'>
        <div className='delay-time'>
          <p> Time for memorization (sec): </p>
          <input type='number' min='1' max='20' value={counter2.timeDelay / 1000} onChange={changeDelayTime} />
        </div>
        <div className='game-time'>
          <p> Game time (sec): </p>
          <input type='number' min='10' max='180' value={counter2.timeGame / 1000} onChange={changeGameTime} />
        </div>
        <div className='amount-clicks'>
          <p> Amount clicks: </p>
          <input type='number' min='16' max='200' value={counter2.amountClicks} onChange={changeAmountClicks} />
        </div>
        <Link to='/'>
          <button className='apply-settings button' onClick={applySettings}> Apply</button>
        </Link>
      </div>
    )
  }
}

Counter.propTypes = {
  applySettings: PropTypes.func.isRequired,
  changeDelayTime: PropTypes.func.isRequired,
  changeGameTime: PropTypes.func.isRequired,
  changeAmountClicks: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  counter2: PropTypes.object.isRequired
}

export default Counter
