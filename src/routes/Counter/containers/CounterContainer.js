import { connect } from 'react-redux'
import { startGame, tryAgain, compareImages } from '../modules/counter'

import Counter from '../components/Counter'

const mapDispatchToProps = {
  startGame,
  tryAgain,
  compareImages
}

const mapStateToProps = (state) => ({
  counter : state.counter,
  counter2 : state.counter2,
  images: state.images
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
