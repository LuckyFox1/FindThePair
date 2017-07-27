import React from 'react'
import PropTypes from 'prop-types'
import './Game.scss'

export class Game extends React.Component {
  constructor (props) {
    super(props)
    this.props.resetGame()
  }
  render () {
    const { game, startGame, tryAgain, compareImages } = this.props
    return (
      <div>
        <div>
          <div className='timer'> <span>&#9200;</span> Timer: {game.timer / 1000} sec</div>
          <div className='counter'> Clicks: {game.counter} </div>
        </div>
        <button className='start-game button' onClick={startGame} disabled={!game.startGameIsActive}>Start</button>
        <button className='try-again button' onClick={tryAgain} disabled={!game.tryAgainIsActive}>Try again</button>
        <div className='image-container'>
          <div className={'win-game' + (game.isWin ? ' active' : '')}>
            <p>You win!</p>
            <p> Time: {(game.gameTime - game.timer) / 1000} sec </p>
            <p> Clicks: {game.amountClicks - game.counter} </p>
          </div>
          <div className={'try-again-game' + (game.isLoose ? ' active' : '')}> <p>Try again!</p> </div>
          {
            game.images.map((item, index) => (
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

Game.propTypes = {
  game: PropTypes.object.isRequired,
  startGame: PropTypes.func.isRequired,
  tryAgain: PropTypes.func.isRequired,
  compareImages: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
}

export default Game
