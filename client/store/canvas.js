import axios from 'axios'
import history from '../history'

const GET_CANVAS = 'GET_CANVAS'

// initial state //
const initialState = {
  fabricCanvas: []
}

// ACTION CREATORS //
const getCanvas = data => ({
  type: GET_STICKERS,
  data
})
