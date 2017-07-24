import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const START_GAME = 'START_GAME'
export const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS'

// ------------------------------------
// Actions
// ------------------------------------

export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export const doubleAsync = (value) => {
  return (dispatch, getState) => {
    dispatch({
      type: COUNTER_INCREMENT,
      payload: value
    })
    return new Promise((resolve) => {
      setInterval(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 1000)
    })
  }
}

export function startGame (value) {
  return (dispatch, getState) => {
    if (!getState().counter.isStarted) {
      dispatch({
        type: START_GAME,
        payload: value
      })
      dispatch({
        type: CHANGE_GAME_STATUS
      })
    }
  }
}

export const actions = {
  increment,
  doubleAsync,
  startGame
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => ({ ...state, counter: state.counter + action.payload }),
  [COUNTER_DOUBLE_ASYNC]: (state, action) => ({ ...state, counter: state.counter * 2 }),
  [START_GAME]: (state, action) => ({
    ...state,
    images: state.images
      .map((item) => ({
        url: item.url,
        isDisplayed: true
      })
    )
  }),
  [CHANGE_GAME_STATUS]: (state) => ({ ...state, isStarted: !state.isStarted })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  counter: 0,
  counter2: 0,
  isStarted: false,
  images: [
    {
      url: img1,
      isDisplayed: false
    },
    {
      url: img2,
      isDisplayed: false
    },
    {
      url: img3,
      isDisplayed: false
    },
    {
      url: img4,
      isDisplayed: false
    },
    {
      url: img5,
      isDisplayed: false
    },
    {
      url: img6,
      isDisplayed: false
    },
    {
      url: img7,
      isDisplayed: false
    },
    {
      url: img8,
      isDisplayed: false
    },
    {
      url: img1,
      isDisplayed: false
    },
    {
      url: img2,
      isDisplayed: false
    },
    {
      url: img3,
      isDisplayed: false
    },
    {
      url: img4,
      isDisplayed: false
    },
    {
      url: img5,
      isDisplayed: false
    },
    {
      url: img6,
      isDisplayed: false
    },
    {
      url: img7,
      isDisplayed: false
    },
    {
      url: img8,
      isDisplayed: false
    }
  ]
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
