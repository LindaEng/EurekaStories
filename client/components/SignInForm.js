import React from 'react'
import {connect} from 'react-redux'
import {auth, me} from '../store/user'
import history from '../history'
import CoverImage from '../../public/LindaEng_Untitled_Artwork_7.png'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

//Helper function - to be called towards the end of form
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
  }
}))

const SignIn = props => {
  const classes = useStyles()

  //HOOKS
  const [state, setInfo] = React.useState({
    email: 'doggo@gmail.com',
    password: 'abc123',
    userNameAndPassword: null,
    fieldEmpty: false
  })

  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    const method = 'login'
    await props.login(email, password, method)

    if (state.user) {
      setInfo({
        ...state,
        fieldEmpty: false,
        userNameAndPassword: true
      })

      history.push(`/${state.user.id}/canvas`)
    } else {
      for (let key in state) {
        if (state[key] === '') {
          setInfo({
            ...state,
            fieldEmpty: true
          })
          return null
        } else {
          setInfo({
            ...state,
            userNameAndPassword: false
          })
          check = false
        }
      }
    }
  }

  const handleChange = event => {
    event.preventDefault()
    const infoType = event.target.id
    const info = event.target.value

    setInfo({
      ...state,
      [infoType]: info,
      fieldEmpty: false,
      submitted: false,
      userNameAndPassword: null
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography variant="h5">
            An account is available below. You can also create a new account and
            use that instead!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              error={
                state.fieldEmpty === true || state.userNameAndPassword === false
              }
              value={state.email}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={
                state.fieldEmpty === true || state.userNameAndPassword === false
              }
              value={state.password}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
// need mapState to be able to use what ever the state is for the user we can't get that data yet until we do the dispatch

const mapState = state => {
  //before we login our user is an empty object
  return {
    user: state.user.defaultUser
  }
}

const mapDispatch = dispatch => {
  return {
    //what is this doing?

    // the purpose of a mapDispatch its a way for us to access the methods that are inside of our store.
    login: (email, password, method) => dispatch(auth(email, password, method)),
    authenticateMe: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(SignIn)
