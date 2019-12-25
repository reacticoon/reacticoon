import React, { useState } from 'react'

import { FlashMessageType } from 'reacticoon-plugins/reacticoon-flash-messages/src/service'

// https://github.com/iamhosseindhv/notistack
import { SnackbarProvider, useSnackbar } from 'notistack'
import FlashMessagesContainer from 'reacticoon-plugins/reacticoon-flash-messages/src/container'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    minWidth: 344,
  },
  typography: {
    fontWeight: 'bold',
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  typeError: {
    backgroundColor: theme.app.colors.error,
  },
  icons: {
    marginLeft: 'auto',
    display: 'flex',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: 'none',
  },
}))

const FlashMessages = React.memo(({ flashMessages }) => {
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    flashMessages.map((flashMessage, index) => {
      const event = flashMessage.data

      const isEventException = event && event.type === 'REACTICOON::LOG::EXCEPTION' // TODO: use constant

      enqueueSnackbar(flashMessage, {
        key: flashMessage.id,
        variant: flashMessage.type,
        persist: isEventException,
      })
    })
  }, [flashMessages])

  return null
})

const SnackMessage = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { closeSnackbar } = useSnackbar()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDismiss = () => {
    closeSnackbar(props.id)
  }

  const { flashMessage } = props
  const event = flashMessage.data

  const isEventException = event && event.type === 'REACTICOON::LOG::EXCEPTION' // TODO: use constant

  return (
    <Card className={classes.card} ref={ref}>
      <CardActions
        classes={{
          root: classNames(classes.actionRoot, {
            [classes.typeError]: flashMessage.type === FlashMessageType.ERROR,
          }),
        }}
      >
        <Typography variant="subtitle2" className={classes.typography}>
          {isEventException ? `Exception ${event.data.exceptionMessage}` : flashMessage.text}
        </Typography>
        <div className={classes.icons}>
          <IconButton
            aria-label="Show more"
            className={classNames(classes.expand, { [classes.expandOpen]: expanded })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton className={classes.expand} onClick={handleDismiss}>
            <CloseIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Paper className={classes.collapse}>
          {isEventException && (
            <pre
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              {event.data.exceptionStack}
            </pre>
          )}
        </Paper>
      </Collapse>
    </Card>
  )
})

const FlashMessageSnackbarView = () => (
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    content={(key, flashMessage) => <SnackMessage key={key} id={key} flashMessage={flashMessage} />}
  >
    <FlashMessagesContainer>
      {({ flashMessages }) => <FlashMessages flashMessages={flashMessages} />}
    </FlashMessagesContainer>
  </SnackbarProvider>
)

export default FlashMessageSnackbarView
