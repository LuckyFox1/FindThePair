import { connect } from 'react-redux'
import { startGame, tryAgain, compareImages, resetGame } from '../modules/counter'

import Counter from '../components/Counter'

const mapDispatchToProps = {
  startGame,
  tryAgain,
  compareImages,
  resetGame
}

const mapStateToProps = (state) => ({
  counter : state.counter,
  counter2: state.counter2
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
