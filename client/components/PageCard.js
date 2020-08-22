import React from 'react'
import {Link} from 'react-router-dom'
import history from '../history'
import PageViewCard from '../components/PageViewCard'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

//icons
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4F6D7A'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  fontStyle: {
    color: '#4F6D7A'
  }
}))

const PageCard = props => {
  const classes = useStyles()
  const pages = props.pages

  const deletePage = pageId => {
    props.deletePage(pageId)
    history.push(`/${props.userId}/gallery/stories/${props.storyId}/pages`)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {pages.length
              ? pages.map((page, id) => (
                  <Grid item key={id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={page.imgURL}
                        title="Image title"
                      />
                      <CardActions>
                        <PageViewCard image={page.imgURL} />

                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{timeout: 600}}
                          title="EDIT"
                          placement="top"
                          arrow
                        >
                          <Link
                            to={`/${props.userId}/canvas/story/${props.storyId}/page/${page.id}`}
                          >
                            <IconButton
                              style={{
                                padding: '30px'
                              }}
                              size="medium"
                              color="secondary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{timeout: 600}}
                          title="DELETE"
                          placement="right"
                          arrow
                        >
                          <IconButton
                            style={{
                              padding: '30px'
                            }}
                            size="medium"
                            color="secondary"
                            onClick={() => deletePage(page.id)}
                          >
                            <DeleteForeverRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  )
}

export default PageCard
