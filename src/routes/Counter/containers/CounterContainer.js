import { connect } from 'react-redux'
import { increment, doubleAsync, startGame } from '../modules/counter'

import Counter from '../components/Counter'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync: () => doubleAsync(10),
  startGame
}

const mapStateToProps = (state) => ({
  counter : state.counter,
  counter2 : state.counter2,
  images: state.images
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
