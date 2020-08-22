import axios from 'axios'
import history from '../history'

//action types
const GET_ONE_STORY = 'GET_ONE_STORY'
const GET_ALL_STORIES = 'GET_ALL_STORIES'
const ADD_STORY = 'ADD_STORY'

//action creator
const getOneStory = story => {
  return {
    type: GET_ONE_STORY,
    story
  }
}

const addNewStory = newStory => {
  return {
    type: ADD_STORY,
    newStory
  }
}

//initial state
const initialState = {
  story: {}
}

//Thunk creators
//get one story by id
export const fetchOneStory = storyId => {
  return async dispatch => {
    const res = await axios.get(`/api/stories/${storyId}`)
    dispatch(getOneStory(res.data))
  }
}

//add Story to User Thunk Creator
export const addStoryToUser = (userId, brandNewStory, fileToUpload) => {
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
              let imageObj = Object.assign(brandNewStory, {
                coverImage: fileName.location
              })
              axios.post(`/api/stories/${userId}/stories`, imageObj)
              dispatch(addNewStory(response.data))
              console.log('fileData', fileName)
              console.log('FILE SUCCESSFULLY LOADED')
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

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_STORY:
      return {...state, story: [...state.allStories, action.newStory]}
    case GET_ONE_STORY:
      return {...state, story: action.story}
    default:
      return state
  }
}
