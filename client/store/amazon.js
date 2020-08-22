import axios from 'axios'

//action type
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

//action creator
const uploadImage = image => {
  return {
    type: UPLOAD_IMAGE,
    image
  }
}

export const singleFileUploadHandler = (
  fileToUpload,
  userId,
  newStory
) => dispatch => {
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

//inital state
const initialState = {
  image: {}
}

//reducer
export default function imageUpload(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: action.image
      }
    default:
      return state
  }
}
