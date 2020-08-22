import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles} from '@material-ui/core/styles'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import TextTool from './TextTool'
import DrawingTool from './DrawingTool'
import StickerBar from './StickerBar'
import Remove from './Delete'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    },
    justifyContent: 'center'
  },
  buttonStyle: {
    color: '#4F6D7A',
    borderRadius: '25%',
    padding: 0,
    margin: 0
  },
  clearButton: {
    padding: 35
  }
}))

const ToolBar = props => {
  const classes = useStyles()

  const clearEl = () => {
    props.canvas.clear()
  }

  return (
    <div className={classes.root}>
      <ButtonGroup orientation="vertical">
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{timeout: 600}}
          title="STICKERS"
          placement="right-start"
          arrow
        >
          <Button className={classes.buttonStyle}>
            <StickerBar
              canvas={props.canvas}
              stickers={props.stickers}
              addToCanvas={props.addToCanvas}
            />
          </Button>
        </Tooltip>

        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{timeout: 600}}
          title="DRAW"
          placement="right-start"
          arrow
        >
          <Button className={classes.buttonStyle}>
            <DrawingTool canvas={props.canvas} />
          </Button>
        </Tooltip>

        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{timeout: 600}}
          title="TEXT"
          placement="right-start"
          arrow
        >
          <Button className={classes.buttonStyle}>
            <TextTool canvas={props.canvas} />
          </Button>
        </Tooltip>

        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{timeout: 600}}
          title="DELETE"
          placement="right-start"
          arrow
        >
          <Button className={classes.buttonStyle}>
            <Remove canvas={props.canvas} />
          </Button>
        </Tooltip>

        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{timeout: 600}}
          title="CLEAR CANVAS"
          placement="right-start"
          arrow
        >
          <Button
            className={classes.buttonStyle}
            aria-label="delete"
            fontSize="large"
          >
            <ClearRoundedIcon
              canvas={props.canvas}
              className={classes.clearButton}
              fontSize="large"
              onClick={() => {
                clearEl()
                props.canvas.backgroundColor = 'white'
              }}
            />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}

export default ToolBar
