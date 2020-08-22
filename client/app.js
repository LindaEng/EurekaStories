import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import theme from './components/UI/theme'

import {ThemeProvider} from '@material-ui/styles'

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  )
}

export default App
