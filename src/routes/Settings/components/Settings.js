import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './Settings.scss'

export class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.props.resetSettings()
  }
  render () {
    const { applySettings, changeDelayTime, changeGameTime, changeAmountClicks, settings } = this.props
    return (
      <div className='settings'>
        <div className='delay-time'>
          <p> Time for memorization (sec): </p>
          <input type='number'
            value={settings.timeDelay / 1000}
            onChange={changeDelayTime} />
        </div>
        <div className='game-time'>
          <p> Game time (sec): </p>
          <input type='number'
            value={settings.timeGame / 1000}
            onChange={changeGameTime} />
        </div>
        <div className='amount-clicks'>
          <p> Amount clicks: </p>
          <input type='number'
            value={settings.amountClicks}
            onChange={changeAmountClicks} />
        </div>
        <Link to='/'>
          <button className='apply-settings button' onClick={applySettings}> Apply</button>
        </Link>
      </div>
    )
  }
}

Settings.propTypes = {
  applySettings: PropTypes.func.isRequired,
  changeDelayTime: PropTypes.func.isRequired,
  changeGameTime: PropTypes.func.isRequired,
  changeAmountClicks: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
}

export default Settings
