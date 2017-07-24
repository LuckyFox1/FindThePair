import React from 'react'
import PropTypes from 'prop-types'
import './Counter.scss'

export const Counter = ({ counter, startGame, counter2 }) => (
  <div>
    <button className='start-game button' onClick={startGame}>Start</button>
    <button className='try-again button'>Try again</button>
    <div className='image-container'>
      {
        counter.images.map((item, index) => (
          <img key={index} src={item.isDisplayed ? item.url : require('../assets/unknown.png')} alt='' />
        ))
      }
    </div>
  </div>
)

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  counter2: PropTypes.number.isRequired,
  startGame: PropTypes.func.isRequired
}

export default Counter
