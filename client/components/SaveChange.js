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
import axios from 'axios'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'

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
    marginRight: '24px'
  }
}))

const SaveChange = props => {
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

  const saveAsNewPage = () => {
    let canvasJSON = JSON.stringify(props.canvas.toDatalessJSON())
    let newPage = {
      canvasPage: canvasJSON
    }
    props.addPage(storyId, newPage)
    handleClose()
  }

  const dataURItoBlob = dataURI => {
    var binary = atob(dataURI.split(',')[1])
    var array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
  }

  const saveChange = () => {
    const canvas = document.getElementById('my-canvas')
    const dataUrl = canvas.toDataURL('image/jpeg')
    const blobData = dataURItoBlob(dataUrl)
    let pageID = props.PageId

    const imageFileToUpload = Object.assign(blobData, {
      name: `PAGE.png`
    })

    let canvasJSON = JSON.stringify(props.canvas.toDatalessJSON())
    let newPage = {
      canvasPage: canvasJSON
    }

    props.editPage(pageID, newPage, imageFileToUpload)
    alert('successfully saved!')
    handleClose()
  }

  return (
    <div>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{timeout: 600}}
        title="SAVE CHANGE"
        placement="top"
        arrow
      >
        <IconButton className={classes.buttonStyle} onClick={handleClickOpen}>
          <SaveIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open.state}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Are you sure ?</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SaveChange
