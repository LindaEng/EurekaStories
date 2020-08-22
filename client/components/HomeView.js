import React from 'react'
import {connect} from 'react-redux'
import {fetchStickers} from '../store/sticker'
import Canvas from './Canvas'
import SaveBar from './SaveBar'
import {fabric} from 'fabric'

import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {fetchAllStories} from '../store/stories'
import {fetchOnePage} from '../store/singlePage'
import axios from 'axios'
import ToolBar from './ToolBar'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#C0D6DF'
  },
  paper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#C0D6DF'
  },
  stickerBar: {
    padding: theme.spacing(4),
    textAlign: 'center',
    height: '800px'
  },
  canvas: {
    width: '100%',
    height: '600px'
  }
})

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.addToCanvas = this.addToCanvas.bind(this)
  }

  componentDidMount() {
    this.props.fetchStickers()
    this.props.fetchAllStories(this.props.match.params.userId)
    let pageId = this.props.match.params.pageId

    if (!pageId) {
      this.canvas = new fabric.Canvas('my-canvas', {backgroundColor: 'white'})
    } else {
      this.canvas = new fabric.Canvas('my-canvas', {backgroundColor: 'white'})
      const findPageById = async () => {
        const {data} = await axios.get(`/api/pages/${pageId}`)
        const canvasJSON = data.canvasPage

        this.canvas.loadFromJSON(canvasJSON)
        this.canvas.backgroundColor = 'white'
      }
      findPageById()
    }
  }

  addToCanvas(sticker) {
    fabric.Image.fromURL(
      sticker.imgURL,
      img => {
        img.scale(0.2)
        img.set({left: 100, top: 100})
        this.canvas
          .add(img)
          .renderAll()
          .setActiveObject(img)
      },
      {crossOrigin: 'Anonymous'}
    )
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Container maxwidth="lg" className={classes.container}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item md={3} spacing={0}>
              <ToolBar
                canvas={this.canvas}
                addToCanvas={this.addToCanvas}
                stickers={this.props.stickers}
              />
            </Grid>
            <Grid item md={9} spacing={0} className={classes.paper}>
              <h1> canvas </h1>
              <SaveBar
                canvas={this.canvas}
                saveFile={this.saveFile}
                exportFile={this.exportFile}
                user={this.props.user}
                stories={this.props.stories}
                pageId={this.props.match.params.pageId}
              />
              <Canvas />
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    stickers: state.sticker.stickers,
    user: state.user,
    stories: state.stories.allStories,
    page: state.allPages.pages
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllStories: userId => dispatch(fetchAllStories(userId)),
    fetchStickers: () => dispatch(fetchStickers()),
    getUser: () => dispatch(me()),
    fetchOnePage: pageId => dispatch(fetchOnePage(pageId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(HomeView))
