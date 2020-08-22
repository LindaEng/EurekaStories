import axios from 'axios'
import history from '../history'

// ACTION TYPES //

const GET_STICKERS = 'GET_STICKERS'

// INITIAL STATE //
const initialState = {
  stickers: []
}

// ACTION CREATORS //
const getStickers = stickers => ({
  type: GET_STICKERS,
  stickers
})

// Thunk Creators //

export const fetchStickers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/stickers/')
    dispatch(getStickers(data))
  } catch (error) {
    console.error(error)
  }
}

// Reducer //

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STICKERS:
      return {...state, stickers: action.stickers}
    default:
      return state
  }
}
