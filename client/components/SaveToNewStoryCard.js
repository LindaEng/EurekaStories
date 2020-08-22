import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {singleFileUploadHandler} from '../store/amazon'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    color: '#4F6D7A',
    padding: 25,
    marginLeft: '24px',
    marginRight: '24px'
  }
}))

const SaveToNewStoryCard = props => {
  const [open, setOpen] = React.useState({
    state: false,
    title: ''
  })

  const handleClickOpen = () => {
    setOpen({
      ...open,
      state: true
    })
  }

  const handleClose = () => {
    setOpen({
      ...open,
      state: false
    })
  }

  const handleChange = event => {
    event.preventDefault()
    const titleLabel = event.target.id
    const title = event.target.value

    setOpen({
      ...open,
      [titleLabel]: title
    })
  }

  const dataURItoBlob = dataURI => {
    var binary = atob(dataURI.split(',')[1])
    var array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
  }

  //SAVE AS JPG FOR AWS IMAGE HOSTING
  const saveAsNewStory = () => {
    const canvas = document.getElementById('my-canvas')
    const dataUrl = canvas.toDataURL('image/jpeg')
    const blobData = dataURItoBlob(dataUrl)

    const imageFileToUpload = Object.assign(blobData, {
      name: `${open.title}.png`
    })

    let canvasJSON = JSON.stringify(props.canvas.toDatalessJSON())
    let newStory = {
      title: open.title,
      canvasJson: canvasJSON
    }

    props.addStory(props.user.id, newStory, imageFileToUpload)
    handleClose()
  }
  const classes = useStyles()
  return (
    <div>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{timeout: 600}}
        title="SAVE AS NEW STORY"
        placement="top"
        arrow
      >
        <IconButton className={classes.buttonStyle} onClick={handleClickOpen}>
          <MenuBookRoundedIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open.state}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Enter a new title for your story
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Congratulations on starting your new story! Please enter a title for
            your new story:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            onChange={handleChange}
            label="eg: Three Little Pigs"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveAsNewStory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    singleFileUploadHandler: image => dispatch(singleFileUploadHandler(image))
  }
}
export default connect(null, mapDispatch)(SaveToNewStoryCard)
