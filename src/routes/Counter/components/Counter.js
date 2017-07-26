import React from 'react'
import PropTypes from 'prop-types'
import './Counter.scss'

export class Counter extends React.Component {
  constructor (props) {
    super(props)
    console.log('construct')
    this.props.resetGame()
  }
  render () {
    const { counter, startGame, tryAgain, compareImages } = this.props
    return (
      <div>
        <div>
          <div className='timer'> <span>&#9200;</span> Timer: {counter.timer / 1000} sec</div>
          <div className='counter'> Clicks: {counter.counter} </div>
        </div>
        <button className='start-game button' onClick={startGame} disabled={!counter.startGameIsActive}>Start</button>
        <button className='try-again button' onClick={tryAgain} disabled={!counter.tryAgainIsActive}>Try again</button>
        <div className='image-container'>
          <div className={'win-game' + (counter.isWin ? ' active' : '')}>
            <p>You win!</p>
            <p> Time: {(counter.gameTime - counter.timer) / 1000} sec </p>
            <p> Clicks: {counter.amountClicks - counter.counter} </p>
          </div>
          <div className={'try-again-game' + (counter.isLoose ? ' active' : '')}> <p>Try again!</p> </div>
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
  compareImages: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
}

export default Counter
