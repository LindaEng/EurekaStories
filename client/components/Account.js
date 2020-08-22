import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import {withStyles} from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    margin: 'auto',
    marginTop: 50,
    width: 275,
    display: 'flex',
    justifyContent: 'center'
  }
})

class Account extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const user = this.props.user
    const {classes} = this.props

    return (
      <Card className={classes.root}>
        <CardContent>
          <Avatar src="/broken-image.jpg" />

          <Typography>{user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
        </CardContent>
      </Card>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default withStyles(styles)(connect(mapState, null)(Account))
