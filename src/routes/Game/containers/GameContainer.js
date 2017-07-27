import { connect } from 'react-redux'
import { startGame, tryAgain, compareImages, resetGame } from '../modules/game'

import Game from '../components/Game'

const mapDispatchToProps = {
  startGame,
  tryAgain,
  compareImages,
  resetGame
}

const mapStateToProps = (state) => ({
  game : state.game,
  settings: state.settings
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
