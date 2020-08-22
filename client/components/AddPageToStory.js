import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'

import IconButton from '@material-ui/core/IconButton'
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  buttonStyle: {
    color: '#4F6D7A',
    padding: 25,
    marginLeft: '24px',
    marginRight: '24px',
    marginBottom: '24px'
  }
}))

const SavePageToStory = props => {
  const stories = props.stories

  const classes = useStyles()
  const [storyId, setStoryId] = React.useState('')
  const [open, setOpen] = React.useState({
    state: false
  })
  const [openDropDown, setOpenDropDown] = React.useState(false)

  const handleChange = event => {
    event.preventDefault()
    setStoryId(event.target.value)
  }

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

  const handleCloseDropDown = () => {
    setOpenDropDown(false)
  }

  const handleOpenDropDown = () => {
    setOpenDropDown(true)
  }

  const dataURItoBlob = dataURI => {
    var binary = atob(dataURI.split(',')[1])
    var array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
  }

  const saveAsNewPage = () => {
    const canvas = document.getElementById('my-canvas')
    const dataUrl = canvas.toDataURL('image/jpeg')
    const blobData = dataURItoBlob(dataUrl)

    const imageFileToUpload = Object.assign(blobData, {
      name: `PAGE.png`
    })

    let canvasJSON = JSON.stringify(props.canvas.toDatalessJSON())
    let newPage = {
      canvasPage: canvasJSON
    }

    props.addPage(storyId, newPage, imageFileToUpload)
    handleClose()
  }

  return (
    <div>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{timeout: 600}}
        title="SAVE PAGE TO STORY"
        placement="top"
        arrow
      >
        <IconButton className={classes.buttonStyle} onClick={handleClickOpen}>
          <LibraryBooksRoundedIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open.state}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Indicate which story to save to:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Choose the following story</DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Story:
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openDropDown}
              onClose={handleCloseDropDown}
              onOpen={handleOpenDropDown}
              value={storyId}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.stories.map((story, id) => {
                return (
                  <MenuItem key={id} value={story.id}>
                    {story.title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveAsNewPage} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SavePageToStory
