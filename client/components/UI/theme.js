import {createMuiTheme} from '@material-ui/core/styles'

const cadet = '#4F6D7A'
const platinum = '#EAEAEA'
const columbiaBlue = '#C0D6DF'
const carnationPink = '#F7ACCF'
const dutchWhite = '#E8DAB2'
const burntSienna = '#DD6E42'
export default createMuiTheme({
  palette: {
    common: {
      columbiaBlue,
      carnationPink,
      dutchWhite,
      burntSienna
    },
    primary: {
      main: `${cadet}`
    },
    secondary: {
      main: `${platinum}`
    }
  },
  typography: {
    fontFamily: `'Baloo Da 2',cursive`,
    color: `${platinum}`,
    button: {
      textTransform: 'none'
    }
  }
})
