import React from 'react'
import GestureRoundedIcon from '@material-ui/icons/GestureRounded'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: 35
  },
  disabled: {
    backgroundColor: theme.palette.primary || 'red'
  }
})

class DrawingTool extends React.Component {
  constructor(props) {
    super(props)

    this.drawOnCanvas = this.drawOnCanvas.bind(this)
  }

  drawOnCanvas() {
    this.props.canvas.isDrawingMode = !this.props.canvas.isDrawingMode
    if (this.props.canvas.isDrawingMode) {
      document.getElementById('draw-button').disabled = false
      document.getElementById('draw-button').style.color = '#F7ACCF'
    } else {
      document.getElementById('draw-button').disabled = true
      document.getElementById('draw-button').style.color = '#4F6D7A'
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <GestureRoundedIcon
          className={classes.root}
          id="draw-button"
          fontSize="large"
          disabled={true}
          onClick={() => {
            this.drawOnCanvas()
          }}
        ></GestureRoundedIcon>
      </div>
    )
  }
}

export default withStyles(styles)(DrawingTool)
