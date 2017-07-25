import React from 'react'
import PropTypes from 'prop-types'
import './Counter.scss'

export class Counter extends React.Component {
  render () {
    const { counter, startGame, tryAgain, compareImages } = this.props
    return (
      <div>
        <div className='timer'> <span>&#9200;</span> Timer: {counter.timer / 1000} sec</div>
        <button className='start-game button' onClick={startGame} disabled={!counter.startGameIsActive}>Start</button>
        <button className='try-again button' onClick={tryAgain} disabled={!counter.tryAgainIsActive}>Try again</button>
        <div className='image-container'>
          {
            counter.images.map((item, index) => (
              <img key={index}
                src={item.isDisplayed || item.wasFind ? item.url : require('../assets/unknown.png')}
                onClick={() => { compareImages(item, index) }}
                width='23%' height='23%' alt='' />
            ))
          }
        </div>
      </div>)
  }
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
  tryAgain: PropTypes.func.isRequired,
  compareImages: PropTypes.func.isRequired
}

export default Counter
