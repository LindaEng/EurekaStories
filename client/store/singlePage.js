import axios from 'axios'
import history from '../history'

//action type
const GET_ONE_PAGE = 'GET_ONE_PAGE'
const EDIT_PAGE = 'EDIT_PAGE'
const ADD_PAGE = 'ADD_PAGE'

//action creator
const getOnePage = page => {
  return {
    type: GET_ONE_PAGE,
    page
  }
}
const editPage = page => {
  return {
    type: EDIT_PAGE,
    page
  }
}
const addPage = page => {
  return {
    type: ADD_PAGE,
    page
  }
}

//initial state
const initialState = {
  page: {}
}

//Thunk Creator
export const fetchOnePage = pageID => async dispatch => {
  try {
    const res = await axios.get(`/api/pages/${pageID}`)
    dispatch(getOnePage(res.data))
  } catch (error) {
    console.log(error)
  }
}

//add page to story
export const addPageToStory = (storyId, newPage, fileToUpload) => {
  return async dispatch => {
    const data = new FormData()
    // If file selected
    if (fileToUpload) {
      data.append('canvasImage', fileToUpload, fileToUpload.name)
      axios
        .post('/api/profile/canvas-img-upload', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(response => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                console.log('FILE TOO BIG')
              } else {
                console.log(response.data)
                // If not the given file type
              }
            } else {
              // Success
              let fileName = response.data
              let imageObj = Object.assign(newPage, {
                imgURL: fileName.location
              })
              axios.post(`/api/stories/${storyId}/pages`, imageObj)
              dispatch(addPage(response.data))
            }
          }
        })
        .catch(error => {
          // If another error
          console.error(error)
        })
    } else {
      // if file not selected throw error
      console.log('UPLOADD SOMETHING')
    }
  }
}

//edit page thunk
export const editOnePage = (pageID, newPage, fileToUpload) => {
  return async dispatch => {
    const data = new FormData()
    // If file selected
    if (fileToUpload) {
      data.append('canvasImage', fileToUpload, fileToUpload.name)
      axios
        .post('/api/profile/canvas-img-upload', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(response => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                console.log('FILE TOO BIG')
              } else {
                console.log(response.data)
                // If not the given file type
              }
            } else {
              // Success
              let fileName = response.data
              let editObj = Object.assign(newPage, {
                imgURL: fileName.location
              })
              axios.put(`/api/pages/${pageID}`, editObj)
              dispatch(editPage(response.data))
            }
          }
        })
        .catch(error => {
          // If another error
          console.error(error)
        })
    } else {
      // if file not selected throw error
      console.log('UPLOADD SOMETHING')
    }
  }
}

//reducer
export default function singlePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_PAGE:
      return {...state, page: action.page}
    case EDIT_PAGE:
      return {...state, page: action.page}
    case ADD_PAGE:
      return {
        ...state,
        pages: action.page
      }
    default:
      return state
  }
}
