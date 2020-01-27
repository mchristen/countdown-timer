import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface DurationFormState {
  value: string;
  valid: boolean;
}

interface DurationFormProps {
  paused: boolean;
  running: boolean;
  onStart: (durationMinutes: number) => void;
  onReset: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    durationForm: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    durationInput: {
      maxWidth: "130px",
    },
    startButton: {
    },
  })
);

const DurationForm: React.FC<DurationFormProps> = (props: DurationFormProps) => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState<DurationFormState>({
    value: '5',
    valid: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Strictly enforce a positive integer value
    setDuration({
      valid: /^\d+$/.test(value),
      value,
    });
  };

  const startButtonDisabled =
    (props.running && !props.paused) || !duration.valid || duration.value === '' || duration.value === '0';
  const hasError = !duration.valid && duration.value !== '';
  return (
    <form className={classes.durationForm} noValidate autoComplete="off">
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item xs={6} sm={4}>
          <TextField
            id="timer-duration"
            className={classes.durationInput}
            label="Countdown"
            value={duration.value}
            onChange={handleChange}
            variant="outlined"
            error={hasError}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={2} className={classes.startButton}>
          <Button
            variant="contained"
            color="primary"
            disabled={startButtonDisabled}
            onClick={() => props.onStart(Number(duration.value))}
          >
            {!props.paused ? 'Start' : 'Restart'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DurationForm;
