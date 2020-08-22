import React from 'react'
import {fabric} from 'fabric'
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: 35
  }
})

class TextTool extends React.Component {
  constructor(props) {
    super(props)

    this.AddText = this.AddText.bind(this)
  }

  AddText() {
    this.props.canvas.add(
      new fabric.IText('Text', {
        left: 50,
        top: 100,
        fontFamily: 'arial',
        fill: '#333',
        fontSize: 50
      })
    )
  }

  render() {
    const {classes} = this.props

    return (
      <TextFieldsRoundedIcon
        className={classes.root}
        fontSize="large"
        id="text-tool"
        onClick={() => {
          this.AddText()
        }}
      ></TextFieldsRoundedIcon>
    )
  }
}

export default withStyles(styles)(TextTool)
