import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DurationForm from './components/DurationForm';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import StatusText from './components/StatusText';
import DurationCountdown from './components/DurationCountdown';
import SpeedControlForm from './components/SpeedControlForm';
import AppReducer from './AppReducer';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [appState, dispatch] = React.useReducer(AppReducer, {
    running: false,
    paused: false,
    finished: false,
    durationInSeconds: 0,
    elapsedTime: 0,
    speedMultiplier: 1,
    lastTickAt: 0,
  });

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      // We only want to run the timer ticks if it has been started and is not paused
      if (appState.running && !appState.paused) {
        dispatch({
          type: 'tick',
        });
      }
    }, 100); // Chose 100ms here to provide a reasonable response time to updating the UI
    return () => clearInterval(intervalHandle);
  }, [appState.running, appState.paused]);

  // We could probably handle all of this through a Context object, but since there is really
  // one level of component nesting this will do for now. Consider refactoring this to use Context
  // if the component hierarchy becomes more complex. 
  const handleStart = (durationMinutes: number) => {
    dispatch({
      type: 'start',
      duration: durationMinutes,
    });
  };

  const handlePause = () => {
    dispatch({
      type: 'pause',
    });
  };

  const handleReset = () => {
    dispatch({
      type: 'reset',
    });
  };

  const handleResume = () => {
    dispatch({
      type: 'resume',
    });
  };

  const handleSpeedChange = (speedMultiplier: number) => {
    dispatch({
      type: 'changeSpeedMultipler',
      speedMultiplier,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.root}>
        <Typography variant="h4">Countdown Timer</Typography>
        <DurationForm paused={appState.paused} running={appState.running} onStart={handleStart} onReset={handleReset} />
        <StatusText
          totalSeconds={appState.durationInSeconds}
          remainingSeconds={appState.durationInSeconds - appState.elapsedTime}
          running={appState.running}
          finished={appState.finished}
        />
        <DurationCountdown
          running={appState.running}
          paused={appState.paused}
          totalSeconds={appState.durationInSeconds}
          remainingSeconds={Math.ceil(appState.durationInSeconds - appState.elapsedTime)}
          onResume={handleResume}
          onPause={handlePause}
        />
        <SpeedControlForm onChange={handleSpeedChange} />
      </Paper>
    </Container>
  );
};

export default App;
