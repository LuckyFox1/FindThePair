// ------------------------------------
// Constants
// ------------------------------------

export const APPLY_SETTINGS = 'APPLY_SETTINGS'
export const CHANGE_DELAY_TIME = 'CHANGE_DELAY_TIME'
export const CHANGE_GAME_TIME = 'CHANGE_GAME_TIME'
export const CHANGE_AMOUNT_CLICKS = 'CHANGE_AMOUNT_CLICKS'

// ------------------------------------
// Actions
// ------------------------------------

export function applySettings (e) {
  return (dispatch, getState) => {
    console.log(e)
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

export const actions = {
  applySettings,
  changeDelayTime,
  changeGameTime,
  changeAmountClicks
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_DELAY_TIME]: (state, action) => {
    if (action.payload > 9) {
      return { ...state, timeDelay: action.payload }
    } else {
      return state
    }
  },
  [APPLY_SETTINGS]: (state) => {
        //
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  timeDelay: 10000,
  timeGame: 60000,
  amountClicks: 100
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
