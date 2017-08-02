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
export const WIN_GAME = 'WIN_GAME'

const AMOUNT_IMAGES = 8
const DELAY_BEFORE_HIDE_IMAGES = 850
const COUNT_SAME_IMAGES = 2
const INTERVAL_TIMER_TICKS = 1000

let timer
let beforeStartTimeout
let images = []

for (let i = 1; i <= AMOUNT_IMAGES; i++) {
  images.push({
    url: require(`../assets/${i}.png`),
    isDisplayed: false,
    class: i + '',
    isChosen: false,
    wasFind: false
  })
}

// ------------------------------------
// Actions
// ------------------------------------
/*
const beginGame = (delayTime, amountClicks) => ({
  type: START_GAME,
  delayTime,
  amountClicks
})
*/

export function startGame () {
  return (dispatch, getState) => {
    if (!getState().game.isStarted) {
      clearInterval(timer)
      clearTimeout(beforeStartTimeout)
      let settings = getState().settings
      let game = getState().game
      let delayTime = settings && settings.isApply ? settings.delayTime : game.delayTime
      let amountClicks = settings && settings.isApply ? settings.amountClicks : game.amountClicks

      dispatch({
        type: START_GAME,
        delayTime,
        amountClicks
      })

      // beginGame(delayTime, amountClicks)

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
    clearInterval(timer)
    clearTimeout(beforeStartTimeout)
    dispatch({
      type: MIX_IMAGES
    })
    dispatch({
      type: SHOW_IMAGES
    })
    let settings = getState().settings
    let game = getState().game
    let delayTime = settings && settings.isApply ? settings.delayTime : game.delayTime
    let amountClicks = settings && settings.isApply ? settings.amountClicks : game.amountClicks

    dispatch({
      type: TRY_AGAIN,
      delayTime,
      amountClicks
    })
    startTimer(dispatch, getState)
  }
}

export function compareImages (value, index) {
  return (dispatch, getState) => {
    let game = getState().game
    if (game.amountChosenImages < COUNT_SAME_IMAGES && game.isStarted && game.canClick) {
      dispatch({
        type: DEC_COUNTER
      })
      if (getState().game.counter === 0) {
        clearInterval(timer)
        dispatch({
          type: LOOSE_GAME
        })
      }
      dispatch({
        type: CHOOSE_IMAGE,
        index
      })
      dispatch({
        type: COUNT_CHOSEN
      })
      if (getState().game.amountChosenImages === COUNT_SAME_IMAGES) {
        dispatch({
          type: COMPARE_IMAGES,
          value,
          index
        })
        dispatch({
          type: CHECK_FIND_IMAGES
        })
        if (getState().game.allFind) {
          clearInterval(timer)
          dispatch({
            type: WIN_GAME
          })
        }
        setTimeout(() => {
          dispatch({
            type: HIDDEN_IMAGES
          })
        }, DELAY_BEFORE_HIDE_IMAGES)
      }
    }
  }
}

export function resetGame () {
  return (dispatch, getState) => {
    clearInterval(timer)
    clearTimeout(beforeStartTimeout)
    let settings = getState().settings
    let game = getState().game
    let delayTime = settings && settings.isApply ? settings.delayTime : game.delayTime
    let gameTime = settings && settings.isApply ? settings.gameTime : game.gameTime
    let amountClicks = settings && settings.isApply ? settings.amountClicks : game.amountClicks
    dispatch({
      type: RESET_GAME,
      delayTime,
      gameTime,
      amountClicks
    })
    clearInterval(timer)
  }
}

function startTimer (dispatch, getState) {
  timer = setInterval(function () {
    dispatch({
      type: DEC_TIMER
    })
    if (getState().game.timer === 0) {
      clearInterval(timer)
      let settings = getState().settings
      let game = getState().game
      let gameTime = settings && settings.isApply ? settings.gameTime : game.gameTime

      dispatch({
        type: SET_TIME,
        gameTime
      })
    }
  }, INTERVAL_TIMER_TICKS)
  beforeStartTimeout = setTimeout(() => {
    dispatch({
      type: RESET_IMAGES_STATE
    })
    timer = setInterval(function () {
      dispatch({
        type: DEC_TIMER
      })
      if (getState().game.timer === 0) {
        clearInterval(timer)
        dispatch({
          type: CHECK_FIND_IMAGES
        })
        if (!getState().game.allFind) {
          dispatch({
            type: LOOSE_GAME
          })
        }
      }
    }, INTERVAL_TIMER_TICKS)
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
    timer: action.delayTime,
    delayTime: action.delayTime,
    counter: action.amountClicks,
    amountClicks: action.amountClicks,
    canClick: false,
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
    return { ...state, images: tempArr }
  },
  [TRY_AGAIN]: (state, action) => ({
    ...state,
    startGameIsActive: false,
    tryAgainIsActive: true,
    isLoose: false,
    isWin: false,
    timer: action.delayTime,
    delayTime: action.delayTime,
    counter: action.amountClicks,
    amountClicks: action.amountClicks,
    canClick: false,
  }),
  [CHOOSE_IMAGE]: (state, action) => ({
    ...state,
    images: state.images.map((item, index) => {
      if (index === action.index && !item.wasFind) {
        return {
          ...item,
          isDisplayed: !item.isChosen,
          isChosen: !item.isChosen
        }
      }
      return item
    })
  }),
  [RESET_IMAGES_STATE]: (state) => ({
    ...state,
    canClick: true,
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
  [COUNT_CHOSEN]: (state) => {
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
          return { ...item, wasFind: true, isChosen: false, isDisplayed: false }
        } else if (action.index === index && !isEqual) {
          return { ...item, isChosen: true, isDisplayed: true }
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
    timer: action.gameTime,
    gameTime: action.gameTime
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
        allFind: true
      }
    } else {
      return state
    }
  },
  [WIN_GAME]: (state) => ({
    ...state,
    isWin: true
  }),
  [LOOSE_GAME]: (state) => ({
    ...state,
    isLoose: true
  }),
  [RESET_GAME]: (state, action) => {
    return {
      ...state,
      counter: 0,
      timer: 0,
      delayTime: action.delayTime,
      gameTime: action.gameTime,
      amountClicks: action.amountClicks,
      isStarted: false,
      tryAgainIsActive: false,
      startGameIsActive: true,
      amountChosenImages: 0,
      isWin: false,
      isLoose: false,
      allFind: false,
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
  canClick: false,
  allFind: false,
  images: images.concat(images)
}

export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
