// ------------------------------------
// Constants
// ------------------------------------

export const APPLY_SETTINGS = 'APPLY_SETTINGS'
export const CHANGE_DELAY_TIME = 'CHANGE_DELAY_TIME'
export const CHANGE_GAME_TIME = 'CHANGE_GAME_TIME'
export const CHANGE_AMOUNT_CLICKS = 'CHANGE_AMOUNT_CLICKS'
export const RESET_SETTINGS = 'RESET_SETTINGS'

const DEFAULT_DELAY_TIME = 10000
const MIN_DELAY_TIME = 2
const MAX_DELAY_TIME = 30
const DEFAULT_GAME_TIME = 60000
const MIN_GAME_TIME = 19
const MAX_GAME_TIME = 120
const DEFAULT_AMOUNT_CLICKS = 100
const MIN_AMOUNT_CLICKS = 15
const MAX_AMOUNT_CLICKS = 200

// ------------------------------------
// Actions
// ------------------------------------

export function applySettings () {
  return (dispatch) => {
    dispatch({
      type: APPLY_SETTINGS
    })
  }
}

export function changeDelayTime (e) {
  return {
    type: CHANGE_DELAY_TIME,
    delayTime: e.target.value
  }
}

export function changeGameTime (e) {
  return {
    type: CHANGE_GAME_TIME,
    gameTime: e.target.value
  }
}

export function changeAmountClicks (e) {
  return {
    type: CHANGE_AMOUNT_CLICKS,
    amountClicks: +e.target.value
  }
}

export function resetSettings () {
  return {
    type: RESET_SETTINGS
  }
}

export const actions = {
  applySettings,
  changeDelayTime,
  changeGameTime,
  changeAmountClicks,
  resetSettings
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_DELAY_TIME]: (state, action) => {
    if (action.delayTime > MIN_DELAY_TIME && action.delayTime <= MAX_DELAY_TIME) {
      return { ...state, delayTime: Math.floor(action.delayTime) * 1000 }
    } else {
      return state
    }
  },
  [CHANGE_GAME_TIME]: (state, action) => {
    if (action.gameTime > MIN_GAME_TIME && action.gameTime < MAX_GAME_TIME) {
      return { ...state, gameTime: Math.floor(action.gameTime) * 1000 }
    } else {
      return state
    }
  },
  [CHANGE_AMOUNT_CLICKS]: (state, action) => {
    if (action.amountClicks > MIN_AMOUNT_CLICKS && action.amountClicks <= MAX_AMOUNT_CLICKS) {
      return { ...state, amountClicks: Math.floor(action.amountClicks) }
    } else {
      return state
    }
  },
  [APPLY_SETTINGS]: (state) => ({
    ...state,
    delayTime: state.delayTime,
    timeGame: state.timeGame,
    amountClicks: state.amountClicks,
    isApply: true
  }),
  [RESET_SETTINGS]: (state) => ({
    ...state,
    // delayTime: DEFAULT_DELAY_TIME,
    // gameTime: DEFAULT_GAME_TIME,
    // amountClicks: DEFAULT_AMOUNT_CLICKS,
    isApply: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  delayTime: DEFAULT_DELAY_TIME,
  gameTime: DEFAULT_GAME_TIME,
  amountClicks: DEFAULT_AMOUNT_CLICKS,
  isApply: false
}

export default function settingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
