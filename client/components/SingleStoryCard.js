import React from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 500
  },
  media: {
    height: 700
  },
  fontStyle: {
    color: '#4F6D7A'
  }
})

const SingleStoryCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/${props.userId}/gallery/stories/${props.story.id}/pages`}>
          <CardMedia className={classes.media} image={props.story.coverImage} />
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.fontStyle}
          >
            {props.story.title}
          </Typography>
          <Typography
            className={classes.fontStyle}
            variant="body2"
            component="p"
          >
            This is my story!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SingleStoryCard
