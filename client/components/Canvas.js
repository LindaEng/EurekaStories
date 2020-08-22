import React, {Component} from 'react'

class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="canvas-size">
        <canvas id="my-canvas" width="850" height="850">
          {' '}
        </canvas>
      </div>
    )
  }
}

export default Canvas
