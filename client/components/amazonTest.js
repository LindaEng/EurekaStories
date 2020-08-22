import React from 'react'
import axios from 'axios'

class AmazonTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      selectedFiles: null
    }
  }
  singleFileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log('UPLOADED FILE TYPE', typeof this.state.selectedFile)
  }

  singleFileUploadHandler = event => {
    const data = new FormData()
    // If file selected
    if (this.state.selectedFile) {
      data.append(
        'canvasImage',
        this.state.selectedFile,
        this.state.selectedFile.name
      )
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

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          <p>Please upload an image for your PICTURE</p>
          <input type="file" onChange={this.singleFileChangedHandler} />
          <div>
            <button onClick={this.singleFileUploadHandler}>Upload!</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AmazonTest
