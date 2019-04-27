import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

// https://material-ui.com/customization/themes/#type-light-dark-theme
const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: blueGrey,
  },
  typography: { useNextVariants: true },
})

function DarkTheme({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default DarkTheme
