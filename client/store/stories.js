import axios from 'axios'
import history from '../history'

//action types
const GET_ALL_STORIES = 'GET_ALL_STORIES'

//action creator
const getAllStories = stories => {
  return {
    type: GET_ALL_STORIES,
    stories
  }
}

//initial state
const initialState = {
  allStories: []
}

//Thunk creators
//get all stories from user
export const fetchAllStories = userId => {
  return async dispatch => {
    const res = await axios.get(`/api/stories/${userId}/stories`)
    dispatch(getAllStories(res.data))
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STORIES:
      return {...state, allStories: action.stories}
    default:
      return state
  }
}
