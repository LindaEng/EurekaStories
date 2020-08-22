import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import logo from '../../public/images/logo.png'
//material ui
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'
//icons
import ColorLensIcon from '@material-ui/icons/ColorLens'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BurstModeRoundedIcon from '@material-ui/icons/BurstModeRounded'
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#DD6E42',
    padding: 0,
    margin: '1px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    margin: '1.5em 1.5em',
    height: '5em',
    width: 'auto'
  },
  headerContainer: {
    justifyContent: 'space-between',
    margin: 0,
    padding: 0
  },
  toolbarMargin: {
    height: '0px'
  },
  font: {
    color: '#4F6D7A'
  },
  buttonStyle: {
    color: '#EAEAEA',
    borderRadius: '50%',
    backgroundColor: '#EAA286',
    padding: 20
  },
  toolBarMargin: {
    ...theme.mixins.toolbar
  }
}))

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{
          background: '#DD6E42',
          boxShadow: 'none'
        }}
      >
        <Toolbar className={classes.headerContainer}>
          <Link to="/canvas">
            <img className={classes.title} src={logo} alt="logo" />
          </Link>
          <Box className={classes.font}>
            {isLoggedIn ? (
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="CANVAS"
                    placement="bottom"
                    arrow
                  >
                    <Link to={`/${user.id}/canvas`}>
                      <Button
                        className={classes.buttonStyle}
                        style={{marginRight: '28px'}}
                      >
                        <ColorLensIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="GALLERY"
                    placement="top"
                    arrow
                  >
                    <Link to={`/${user.id}/gallery`}>
                      <Button
                        className={classes.buttonStyle}
                        style={{marginRight: '30px'}}
                      >
                        <BurstModeRoundedIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="LOG OUT"
                    placement="bottom"
                    arrow
                  >
                    <Button
                      className={classes.buttonStyle}
                      style={{marginRight: '30px'}}
                      onClick={handleClick}
                    >
                      <EmojiPeopleRoundedIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="ACCOUNT"
                    placement="top"
                    arrow
                  >
                    <Link to={`/${user.id}/account`}>
                      <Button
                        className={classes.buttonStyle}
                        style={{marginRight: '60px'}}
                      >
                        <AccountCircleIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {/* The navbar will show these links before you log in */}
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="CANVAS"
                    placement="bottom"
                    arrow
                  >
                    <Link to="/canvas">
                      <Button
                        className={classes.buttonStyle}
                        style={{marginRight: '26px'}}
                      >
                        <ColorLensIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="LOG IN"
                    placement="top"
                    arrow
                  >
                    <Link to="/signin">
                      <Button
                        className={classes.buttonStyle}
                        style={{marginRight: '28px'}}
                      >
                        <PersonPinIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 600}}
                    title="SIGN UP"
                    placement="bottom"
                    arrow
                  >
                    <Link to="/signup">
                      <Button
                        className={classes.buttonStyle}
                        style={{marginRight: '60px'}}
                      >
                        <PersonAddIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                </Grid>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(Navbar)
