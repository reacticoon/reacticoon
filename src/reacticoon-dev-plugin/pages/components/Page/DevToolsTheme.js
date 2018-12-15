import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// https://material-ui.com/customization/themes/#type-light-dark-theme
const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
  // typography: { useNextVariants: true },
})

function DevToolsTheme({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

export default DevToolsTheme