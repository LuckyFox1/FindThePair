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

export const DEC_COUNTER = 'DEC_COUNTER'
export const START_GAME = 'START_GAME'
export const TRY_AGAIN = 'TRY_AGAIN'
export const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS'
export const MIX_IMAGES = 'MIX_IMAGES'
export const CHOOSE_IMAGE = 'CHOOSE_IMAGE'
export const RESET_IMAGES_STATE = 'RESET_IMAGES_STATE'
export const SHOW_IMAGES = 'SHOW_IMAGES'
export const COMPARE_IMAGES = 'COMPARE_IMAGES'
export const COUNT_CHOSEN = 'COUNT_CHOSEN'
export const HIDDEN_IMAGES = 'HIDDEN_IMAGES'
export const INC_TIMER = 'INC_TIMER'
export const DEC_TIMER = 'DEC_TIMER'
export const SET_TIME = 'SET_TIME'
export const CHECK_FIND_IMAGES = 'CHECK_FIND_IMAGES'
export const LOOSE_GAME = 'LOOSE_GAME'
export const RESET_GAME = 'RESET_GAME'

let timer
let timeout
let canClick = false

// ------------------------------------
// Actions
// ------------------------------------

export function startGame () {
  return (dispatch, getState) => {
    if (!getState().game.isStarted) {
      clearTimeout(timer)
      clearTimeout(timeout)
      canClick = false
      dispatch({
        type: START_GAME,
        payload: getState().settings && getState().settings.isApply
          ? getState().settings.timeDelay : getState().game.delayTime,
        payload2: getState().settings && getState().settings.isApply
          ? getState().settings.amountClicks : getState().game.amountClicks
      })
      dispatch({
        type: MIX_IMAGES
      })
      dispatch({
        type: CHANGE_GAME_STATUS
      })
      startTimer(dispatch, getState)
    }
  }
}

export function tryAgain () {
  return (dispatch, getState) => {
    clearTimeout(timer)
    clearTimeout(timeout)
    canClick = false
    dispatch({
      type: MIX_IMAGES
    })
    dispatch({
      type: SHOW_IMAGES
    })
    dispatch({
      type: TRY_AGAIN,
      payload: getState().settings && getState().settings.isApply
        ? getState().settings.timeDelay : getState().game.delayTime,
      payload2: getState().settings && getState().settings.isApply
        ? getState().settings.amountClicks : getState().game.amountClicks
    })
    startTimer(dispatch, getState)
  }
}

export function compareImages (value, index) {
  return (dispatch, getState) => {
    if (getState().game.amountChosenImages < 2 && getState().game.isStarted) {
      if (canClick) {
        dispatch({
          type: DEC_COUNTER
        })
        if (getState().game.counter === 0) {
          clearTimeout(timer)
          dispatch({
            type: LOOSE_GAME
          })
        }
      }
      dispatch({
        type: CHOOSE_IMAGE,
        payload: index
      })
      dispatch({
        type: COUNT_CHOSEN,
        payload: value
      })
      if (getState().game.amountChosenImages === 2) {
        dispatch({
          type: COMPARE_IMAGES,
          value: value,
          index: index
        })
        dispatch({
          type: CHECK_FIND_IMAGES
        })
        if (getState().game.isWin) {
          clearTimeout(timer)
        }
        setTimeout(() => {
          dispatch({
            type: HIDDEN_IMAGES
          })
        }, 850)
      }
    }
  }
}

export function resetGame () {
  return (dispatch) => {
    clearTimeout(timer)
    clearTimeout(timeout)
    dispatch({
      type: RESET_GAME
    })
  }
}

function startTimer (dispatch, getState) {
  timer = setTimeout(function tick () {
    dispatch({
      type: DEC_TIMER
    })
    timer = setTimeout(tick, 1000)
    if (getState().game.timer === 0) {
      clearTimeout(timer)
      dispatch({
        type: SET_TIME,
        payload: getState().settings && getState().settings.isApply
          ? getState().settings.timeGame : getState().game.gameTime
      })
    }
  }, 1000)
  timeout = setTimeout(() => {
    dispatch({
      type: RESET_IMAGES_STATE
    })
    canClick = true
    timer = setTimeout(function tick () {
      dispatch({
        type: DEC_TIMER
      })
      timer = setTimeout(tick, 1000)
      if (getState().game.timer === 0) {
        clearTimeout(timer)
        dispatch({
          type: CHECK_FIND_IMAGES
        })
        if (!getState().game.isWin) {
          dispatch({
            type: LOOSE_GAME
          })
        }
      }
    }, 1000)
  }, getState().game.delayTime)
}

export const actions = {
  startGame,
  tryAgain,
  compareImages,
  resetGame
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [DEC_COUNTER]: (state, action) => ({ ...state, counter: state.counter - 1 }),
  [START_GAME]: (state, action) => ({
    ...state,
    tryAgainIsActive: !state.tryAgainIsActive,
    startGameIsActive: !state.startGameIsActive,
    timer: action.payload,
    delayTime: action.payload,
    counter: action.payload2,
    amountClicks: action.payload2,
    images: state.images
      .map((item) => ({
        ...item,
        url: item.url,
        isDisplayed: true
      })
    )
  }),
  [CHANGE_GAME_STATUS]: (state) => ({ ...state, isStarted: true }),
  [MIX_IMAGES]: (state) => {
    let tempArr = state.images
    tempArr.sort(() => {
      return Math.random() - 0.5
    })
    return {...state, images: tempArr}
  },
  [TRY_AGAIN]: (state, action) => ({
    ...state,
    startGameIsActive: false,
    tryAgainIsActive: true,
    isLoose: false,
    isWin: false,
    timer: action.payload,
    delayTime: action.payload,
    counter: action.payload2,
    amountClicks: action.payload2
  }),
  [CHOOSE_IMAGE]: (state, action) => ({
    ...state,
    images: state.images.map((item, index) => {
      if (index === action.payload && !item.wasFind) {
        return {...item, isDisplayed: !item.isChosen, isChosen: !item.isChosen}
      } else {
        return item
      }
    })
  }),
  [RESET_IMAGES_STATE]: (state) => ({
    ...state,
    images: state.images.map((item) => {
      return {
        ...item,
        isDisplayed: false,
        isChosen: false,
        wasFind: false
      }
    })
  }),
  [SHOW_IMAGES]: (state) => ({
    ...state,
    images: state.images.map((item) => ({
      ...item,
      isDisplayed: true
    }))
  }),
  [COUNT_CHOSEN]: (state, action) => {
    let amount = 0
    state.images.map((item) => {
      if (item.isChosen === true) {
        amount++
      }
    })
    return {
      ...state,
      amountChosenImages: amount
    }
  },
  [COMPARE_IMAGES]: (state, action) => {
    let isEqual = false
    state.images.map((item, index) => {
      if (action.index !== index && action.value.class === item.class && item.isChosen) {
        isEqual = true
      } else if (action.index !== index && action.value.class !== item.class && item.isChosen) {
        isEqual = false
      }
    })
    return {
      ...state,
      images: state.images.map((item, index) => {
        if ((action.index === index || action.value.class === item.class) && isEqual) {
          return {...item, wasFind: true, isChosen: false, isDisplayed: false}
        } else if (action.index === index && !isEqual) {
          return {...item, isChosen: true, isDisplayed: true}
        } else {
          return item
        }
      })
    }
  },
  [HIDDEN_IMAGES]: (state) => ({
    ...state,
    amountChosenImages: 0,
    images: state.images.map((item) => {
      if (!item.wasFind) {
        return {...item, isChosen: false, isDisplayed: false}
      } else {
        return item
      }
    })
  }),
  [INC_TIMER]: (state) => ({
    ...state,
    timer: state.timer + 1000
  }),
  [DEC_TIMER]: (state) => ({
    ...state,
    timer: state.timer - 1000
  }),
  [SET_TIME]: (state, action) => ({
    ...state,
    timer: action.payload,
    gameTime: action.payload
  }),
  [CHECK_FIND_IMAGES]: (state) => {
    let key = true
    state.images.map((item) => {
      if (!item.wasFind) {
        key = false
      }
    })
    if (key) {
      return {
        ...state,
        isWin: true
      }
    } else {
      return state
    }
  },
  [LOOSE_GAME]: (state) => ({
    ...state,
    isLoose: true
  }),
  [RESET_GAME]: (state) => {
    return {
      ...state,
      counter: 0,
      timer: 0,
      delayTime: 10000,
      gameTime: 60000,
      amountClicks: 100,
      isStarted: false,
      tryAgainIsActive: false,
      startGameIsActive: true,
      amountChosenImages: 0,
      isWin: false,
      isLoose: false,
      images: state.images.map((item) => {
        return {
          ...item,
          isDisplayed: false,
          isChosen: false,
          wasFind: false
        }
      })
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  counter: 0,
  timer: 0,
  delayTime: 10000,
  gameTime: 60000,
  amountClicks: 100,
  isStarted: false,
  tryAgainIsActive: false,
  startGameIsActive: true,
  amountChosenImages: 0,
  isWin: false,
  isLoose: false,
  images: [
    {
      url: img1,
      isDisplayed: false,
      class: '1',
      isChosen: false,
      wasFind: false
    },
    {
      url: img2,
      isDisplayed: false,
      class: '2',
      isChosen: false,
      wasFind: false
    },
    {
      url: img3,
      isDisplayed: false,
      class: '3',
      isChosen: false,
      wasFind: false
    },
    {
      url: img4,
      isDisplayed: false,
      class: '4',
      isChosen: false,
      wasFind: false
    },
    {
      url: img5,
      isDisplayed: false,
      class: '5',
      isChosen: false,
      wasFind: false
    },
    {
      url: img6,
      isDisplayed: false,
      class: '6',
      isChosen: false,
      wasFind: false
    },
    {
      url: img7,
      isDisplayed: false,
      class: '7',
      isChosen: false,
      wasFind: false
    },
    {
      url: img8,
      isDisplayed: false,
      class: '8',
      isChosen: false,
      wasFind: false
    },
    {
      url: img1,
      isDisplayed: false,
      class: '1',
      isChosen: false,
      wasFind: false
    },
    {
      url: img2,
      isDisplayed: false,
      class: '2',
      isChosen: false,
      wasFind: false
    },
    {
      url: img3,
      isDisplayed: false,
      class: '3',
      isChosen: false,
      wasFind: false
    },
    {
      url: img4,
      isDisplayed: false,
      class: '4',
      isChosen: false,
      wasFind: false
    },
    {
      url: img5,
      isDisplayed: false,
      class: '5',
      isChosen: false,
      wasFind: false
    },
    {
      url: img6,
      isDisplayed: false,
      class: '6',
      isChosen: false,
      wasFind: false
    },
    {
      url: img7,
      isDisplayed: false,
      class: '7',
      isChosen: false,
      wasFind: false
    },
    {
      url: img8,
      isDisplayed: false,
      class: '8',
      isChosen: false,
      wasFind: false
    }
  ]
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
