import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: '100%'
  }
}))(MuiDialogContent)

export default function PageViewCard(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{timeout: 600}}
        title="VIEW"
        placement="left"
        arrow
      >
        <IconButton
          style={{padding: '30px'}}
          size="medium"
          color="secondary"
          onClick={handleClickOpen}
        >
          <VisibilityRoundedIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <img src={props.image} height="700rem" width="700rem" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
