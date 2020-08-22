/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import CoverImage from '../../public/LindaEng_Untitled_Artwork 5.png'
import {addNewUser, me} from '../store/user'
import history from '../history'

import Avatar from '@material-ui/core/Avatar'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${CoverImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: 'red',
    marginLeft: '1em'
  }
}))

const SignUpForm = props => {
  const classes = useStyles()
  const [state, setInfo] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fieldEmpty: false
  })

  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Eureka © '}
        <Link
          color="inherit"
          href="https://github.com/WDF-2004-THE-A-TEAM/capstone/"
        >
          The A Team
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    for (let key in state) {
      if (state[key] === '') {
        setInfo({
          ...state,
          fieldEmpty: true
        })
        return null
      }
    }
    if (state.password !== state.confirmPassword) {
      return null
    } else {
      const newUserName = `${event.target.firstName.value} ${event.target.lastName.value}`
      const newEmail = event.target.email.value
      const newPassword = event.target.password.value

      const newUser = {
        name: newUserName,
        email: newEmail,
        password: newPassword,
        salt: 'salty123',
        googleId: newUserName,
        isLoggedIn: true
      }
      props.signUp(newUser)
    }
  }

  const handleChange = event => {
    event.preventDefault()
    const infoType = event.target.id
    const info = event.target.value

    setInfo({
      ...state,
      [infoType]: info,
      fieldEmpty: false
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={state.fieldEmpty === true && !state.firstName}
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={state.fieldEmpty === true && !state.lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={state.lastName}
                  onChange={handleChange}
                  autoComplete="lname"
                />
              </Grid>
            </Grid>
            {state.fieldEmpty ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.error}>** Required</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.error}>** Required</Typography>
                </Grid>
              </Grid>
            ) : null}
            <TextField
              error={state.fieldEmpty === true && !state.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={state.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            {state.fieldEmpty && !state.email ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.error}>** Required</Typography>
                </Grid>
              </Grid>
            ) : null}
            <TextField
              error={state.password.length <= 8 && state.password !== ''}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              //if you do not define the value in state, it will initally have an undefined value
              value={state.password || ''}
              onChange={handleChange}
            />
            {state.password.length <= 8 && state.password !== '' ? (
              <Typography>
                The password needs to be at least 8 characters long
              </Typography>
            ) : null}
            <TextField
              error={state.password !== state.confirmPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              value={state.confirmPassword || ''}
              onChange={handleChange}
            />
            {state.password !== state.confirmPassword ? (
              <Typography>Passwords must match</Typography>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

const mapState = state => {
  return {
    user: state.user.defaultUser
  }
}

const mapToDispatch = dispatch => {
  return {
    signUp: newUser => dispatch(addNewUser(newUser)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapToDispatch)(SignUpForm)
