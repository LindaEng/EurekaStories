import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: 35
  }
})

class Remove extends React.Component {
  constructor(props) {
    super(props)

    this.Remove = this.Remove.bind(this)
  }

  Remove() {
    this.props.canvas.getActiveObjects().forEach(obj => {
      this.props.canvas.remove(obj)
    })
  }

  render() {
    const {classes} = this.props

    return (
      <div>
        <div>{this.props.eventKey}</div>
        <KeyboardEventHandler
          handleKeys={['backspace']}
          onKeyEvent={(key, e) => {
            this.Remove()
          }}
        ></KeyboardEventHandler>

        <DeleteForeverRoundedIcon
          className={classes.root}
          id="text-tool"
          fontSize="large"
          onClick={() => {
            this.Remove()
          }}
        >
          Delete
        </DeleteForeverRoundedIcon>
      </div>
    )
  }
}

export default withStyles(styles)(Remove)
