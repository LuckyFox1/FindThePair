import { connect } from 'react-redux'
import { applySettings, changeDelayTime, changeGameTime, changeAmountClicks, resetSettings } from '../modules/settings'

import Settings from '../components/Settings'

const mapDispatchToProps = {
  applySettings,
  changeDelayTime,
  changeGameTime,
  changeAmountClicks,
  resetSettings
}

const mapStateToProps = (state) => ({
  game: state.game,
  settings: state.settings
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
