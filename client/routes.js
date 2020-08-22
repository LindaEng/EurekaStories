import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, StickerBar} from './components'
import Homeview from './components/HomeView'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import SplashPage from './components/SplashPage'
import Gallery from './components/Gallery'
import Pages from './components/Pages'
import AmazonTest from './components/amazonTest'
import Account from './components/Account'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route exact path="/canvas" component={Homeview} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/signin" component={SignInForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Gallery} />
            <Route exact path="/:userId/canvas" component={Homeview} />
            <Route
              exact
              path="/:userId/canvas/story/:storyId/page/:pageId"
              component={Homeview}
            />
            <Route exact path="/:userId/gallery" component={Gallery} />
            <Route
              exact
              path="/:userId/gallery/stories/:storyId/pages"
              component={Pages}
            />
            <Route exact path="/:userId/account" component={Account} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route exact path="/" component={SplashPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
