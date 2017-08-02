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
          <label> Time for memorization (sec): </label>
          <input type='number'
            name='delayTime'
            value={settings.delayTime / 1000}
            onChange={changeDelayTime} />
        </div>
        <div className='game-time'>
          <label> Game time (sec): </label>
          <input type='number'
            name='gameTime'
            value={settings.gameTime / 1000}
            onChange={changeGameTime} />
        </div>
        <div className='amount-clicks'>
          <label> Amount clicks: </label>
          <input type='number'
            name='amountClicks'
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
