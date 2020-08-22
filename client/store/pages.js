import axios from 'axios'
import history from '../history'

//action types
const GET_ALL_PAGES = 'GET_ALL_PAGES'
const DELETE_PAGE = 'DELETE_PAGE'

//action creators
const getAllPages = pages => {
  return {
    type: GET_ALL_PAGES,
    pages
  }
}
const deleteOnePage = pageId => {
  return {
    type: DELETE_PAGE,
    pageId
  }
}

//initial state
const initialState = {
  pages: []
}

//Thunk creators
//fetch all pages from user
export const fetchAllPages = storyId => async dispatch => {
  try {
    const res = await axios.get(`/api/stories/${storyId}/pages`)
    dispatch(getAllPages(res.data))
  } catch (error) {
    console.error(error)
  }
}

//delete a page
export const deletePage = pageId => async dispatch => {
  try {
    await axios.delete(`/api/pages/${pageId}`)
    dispatch(deleteOnePage(pageId))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function allPages(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PAGES:
      return {...state, pages: action.pages}
    case DELETE_PAGE:
      return {
        ...state,
        pages: state.pages.filter(page => page.id !== action.pageId)
      }
    default:
      return state
  }
}
