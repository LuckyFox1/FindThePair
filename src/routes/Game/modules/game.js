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
export const HIDDEN_IMAGES = 'HIDDEN_IMAGES'
export const INC_TIMER = 'INC_TIMER'
export const DEC_TIMER = 'DEC_TIMER'
export const SET_TIME = 'SET_TIME'
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

const beginGame = (delayTime, amountClicks) => ({
  type: START_GAME,
  delayTime,
  amountClicks
})

const mixImages = () => ({
  type: MIX_IMAGES
})

const changeGameStatus = () => ({
  type: CHANGE_GAME_STATUS
})

const showImages = () => ({
  type: SHOW_IMAGES
})

const tryAgainGame = (delayTime, amountClicks) => ({
  type: TRY_AGAIN,
  delayTime,
  amountClicks
})

const decCounter = () => ({
  type: DEC_COUNTER
})

const looseGame = () => ({
  type: LOOSE_GAME
})

const chooseImage = (index) => ({
  type: CHOOSE_IMAGE,
  index
})

const compareImgs = (value, index) => ({
  type: COMPARE_IMAGES,
  value,
  index
})

const winGame = () => ({
  type: WIN_GAME
})

const hiddenImages = () => ({
  type: HIDDEN_IMAGES
})

const resetGameProcess = (delayTime, gameTime, amountClicks) => ({
  type: RESET_GAME,
  delayTime,
  gameTime,
  amountClicks
})

const decTimer = () => ({
  type: DEC_TIMER
})

const setTime = (gameTime) => ({
  type: SET_TIME,
  gameTime
})

const resetImageState = () => ({
  type: RESET_IMAGES_STATE
})

export function startGame () {
  return (dispatch, getState) => {
    if (!getState().game.isStarted) {
      clearInterval(timer)
      clearTimeout(beforeStartTimeout)
      let settings = getState().settings
      let game = getState().game
      let delayTime = settings && settings.isApply ? settings.delayTime : game.delayTime
      let amountClicks = settings && settings.isApply ? settings.amountClicks : game.amountClicks

      dispatch(beginGame(delayTime, amountClicks))
      dispatch(mixImages())
      dispatch(changeGameStatus())
      startTimer(dispatch, getState)
    }
  }
}

export function tryAgain () {
  return (dispatch, getState) => {
    clearInterval(timer)
    clearTimeout(beforeStartTimeout)
    dispatch(resetGame())
    dispatch(mixImages())
    dispatch(showImages())
    let settings = getState().settings
    let game = getState().game
    let delayTime = settings && settings.isApply ? settings.delayTime : game.delayTime
    let amountClicks = settings && settings.isApply ? settings.amountClicks : game.amountClicks
    dispatch(tryAgainGame(delayTime, amountClicks))
    startTimer(dispatch, getState)
  }
}

export function compareImages (value, index) {
  return (dispatch, getState) => {
    let game = getState().game
    let chosenImages = game.images.filter(img => img.isChosen)
    let chosenImagesAmount = chosenImages.length

    if (chosenImagesAmount >= COUNT_SAME_IMAGES || !game.isStarted || !game.canClick) {
      return false
    }

    chosenImagesAmount++
    dispatch(decCounter())

    if (getState().game.counter === 0) {
      clearInterval(timer)
      dispatch(looseGame())
    }
    dispatch(chooseImage(index))

    if (chosenImagesAmount === COUNT_SAME_IMAGES) {
      dispatch(compareImgs(value, index))

      let allFind = getState().game.images.every(img => img.wasFind)

      if (allFind) {
        dispatch(winGame())
        clearInterval(timer)
      }

      let foundImages = getState().game.images.filter(img => img.class === chosenImages[0].class)
      console.log(foundImages)
      if (!foundImages[0].wasFind) {
        setTimeout(() => {
          dispatch(hiddenImages())
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
    dispatch(resetGameProcess(delayTime, gameTime, amountClicks))
    clearInterval(timer)
  }
}

function startTimer (dispatch, getState) {
  timer = setInterval(function () {
    dispatch(decTimer())
    if (getState().game.timer === 0) {
      clearInterval(timer)
      let settings = getState().settings
      let game = getState().game
      let gameTime = settings && settings.isApply ? settings.gameTime : game.gameTime
      dispatch(setTime(gameTime))
      clearInterval(timer)
    }
  }, INTERVAL_TIMER_TICKS)
  beforeStartTimeout = setTimeout(() => {
    dispatch(resetImageState())
    timer = setInterval(function () {
      dispatch(decTimer())
      if (getState().game.timer === 0) {
        clearInterval(timer)
        let allFind = getState().game.images.every(img => img.wasFind)

        if (!allFind) {
          dispatch(looseGame())
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
    enableSettings: false,
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
    isStarted:true,
    canClick: false,
    enableSettings: false
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
        }
        return item
      })
    }
  },
  [HIDDEN_IMAGES]: (state) => ({
    ...state,
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
  [WIN_GAME]: (state) => ({
    ...state,
    isWin: true,
    enableSettings: true
  }),
  [LOOSE_GAME]: (state) => ({
    ...state,
    isLoose: true,
    enableSettings: true
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
      isWin: false,
      isLoose: false,
      // allFind: false,
      enableSettings: true,
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
  isWin: false,
  isLoose: false,
  canClick: false,
  enableSettings: true,
  images: images.concat(images)
}

export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
