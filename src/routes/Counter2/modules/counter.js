// ------------------------------------
// Constants
// ------------------------------------

export const APPLY_SETTINGS = 'APPLY_SETTINGS'
export const CHANGE_DELAY_TIME = 'CHANGE_DELAY_TIME'
export const CHANGE_GAME_TIME = 'CHANGE_GAME_TIME'
export const CHANGE_AMOUNT_CLICKS = 'CHANGE_AMOUNT_CLICKS'
export const RESET_SETTINGS = 'RESET_SETTINGS'

// ------------------------------------
// Actions
// ------------------------------------

export function applySettings (e) {
  return (dispatch, getState) => {
    dispatch({
      type: APPLY_SETTINGS
    })
  }
}

export function changeDelayTime (e) {
  return {
    type: CHANGE_DELAY_TIME,
    payload: e.target.value
  }
}

export function changeGameTime (e) {
  return {
    type: CHANGE_GAME_TIME,
    payload: e.target.value
  }
}

export function changeAmountClicks (e) {
  return {
    type: CHANGE_AMOUNT_CLICKS,
    payload: e.target.value
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
    if (action.payload > 4 && action.payload <= 30) {
      return { ...state, timeDelay: action.payload * 1000 }
    } else {
      return state
    }
  },
  [CHANGE_GAME_TIME]: (state, action) => {
    if (action.payload > 19 && action.payload < 120) {
      return { ...state, timeGame: action.payload * 1000 }
    } else {
      return state
    }
  },
  [CHANGE_AMOUNT_CLICKS]: (state, action) => {
    if (action.payload > 15 && action.payload <= 200) {
      return { ...state, amountClicks: +action.payload }
    } else {
      return state
    }
  },
  [APPLY_SETTINGS]: (state) => ({
    ...state,
    timeDelay: state.timeDelay,
    timeGame: state.timeGame,
    amountClicks: state.amountClicks,
    isApply: true
  }),
  [RESET_SETTINGS]: (state) => ({
    ...state,
    timeDelay: 10000,
    timeGame: 60000,
    amountClicks: 100,
    isApply: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  timeDelay: 10000,
  timeGame: 60000,
  amountClicks: 100,
  isApply: false
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
