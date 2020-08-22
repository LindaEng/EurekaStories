import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import PageCard from './PageCard'
import {fetchAllPages, deletePage} from '../store/pages'
import {fetchOneStory} from '../store/singleStory'

const styles = theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  }
})

class Pages extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllPages(this.props.match.params.storyId)
    this.props.fetchOneStory(this.props.match.params.storyId)
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Paper
          className={classes.mainFeaturedPost}
          style={{
            backgroundImage: this.props.story
              ? `url(${this.props.story.coverImage})`
              : null
          }}
        >
          <img
              style={{display: 'none'}}
              src={`${this.props.story.coverImage}`}
            />
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {this.props.story.title}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <PageCard
          pages={this.props.pages}
          userId={this.props.match.params.userId}
          storyId={this.props.match.params.storyId}
          deletePage={this.props.deletePage}
        />
      </div>
    )
  }
}

Pages.propTypes = {
  post: PropTypes.object
}

const mapState = state => {
  return {
    pages: state.allPages.pages,
    story: state.singleStory.story
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOneStory: storyId => dispatch(fetchOneStory(storyId)),
    fetchAllPages: storyId => dispatch(fetchAllPages(storyId)),
    deletePage: (pageId, userId) => dispatch(deletePage(pageId, userId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Pages))
