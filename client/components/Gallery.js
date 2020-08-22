import React from 'react'
import {connect} from 'react-redux'
import {fetchAllStories} from '../store/stories'
import SingleStoryCard from './SingleStoryCard'

import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    this.props.fetchAllStories(this.props.match.params.userId)
  }

  render() {
    const {classes} = this.props

    return (
      //create gallery card here
      <div className={classes.root}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <div>
              <h2 id="user-name"> Welcome, {this.props.user.name}!</h2>
            </div>
            <Grid container spacing={3}>
              {this.props.stories !== undefined
                ? this.props.stories.map(story => {
                    return (
                      <Grid key={story.id} item xs={12} sm={3}>
                        <SingleStoryCard
                          key={story.id}
                          story={story}
                          userId={this.props.user.id}
                          stories={this.props.stories}
                        />
                      </Grid>
                    )
                  })
                : null}
            </Grid>
          </Container>
        </React.Fragment>
      </div>
    )
  }
}

const mapState = state => {
  return {
    stories: state.stories.allStories,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllStories: userId => dispatch(fetchAllStories(userId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Gallery))
