import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Popover from '@material-ui/core/Popover'
import ImageRoundedIcon from '@material-ui/icons/ImageRounded'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: 300,
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: '5px'
  },
  button: {
    padding: 35
  }
}))

const StickerBar = props => {
  const stickers = props.stickers
  const addToCanvas = props.addToCanvas

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  //handles sticker popup
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  //The stickers are here in this body but rendered below in the the Popover component
  const body = (
    <div id="sticker" className={classes.root}>
      <GridList className={classes.gridList} cellHeight={210} col={2}>
        {stickers.map((sticker, id) => {
          return (
            <GridListTile
              key={id}
              onClick={() => {
                addToCanvas(sticker)
              }}
            >
              <img src={`${sticker.imgURL}`} width="100%" height="auto" />
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  )

  return (
    <div>
      <ImageRoundedIcon
        className={classes.button}
        fontSize="large"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      ></ImageRoundedIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        marginThreshold={16}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {body}
      </Popover>
    </div>
  )
}

export default StickerBar
