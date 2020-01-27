import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

interface StatusTextProps {
  totalSeconds: number;
  remainingSeconds: number;
  running: boolean;
  finished: boolean;
}

interface StyleProps {
  fontColor: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@keyframes blinkingText": {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
    statusText: {
      fontSize: theme.typography.h5.fontSize,
      marginTop: theme.spacing(2),
      color: (props: StyleProps) => props.fontColor,
    },
    blinkingStatusText: {
      fontSize: theme.typography.h5.fontSize,
      marginTop: theme.spacing(2),
      animation: "$blinkingText 1.2s linear infinite",
      color: (props: StyleProps) => props.fontColor,
    },
  })
);

const StatusText: React.FC<StatusTextProps> = (props: StatusTextProps) => {
  const fontColor = props.remainingSeconds <= 20 ? "red" : "black";
  const classes = useStyles({fontColor});
  const cx = (props.remainingSeconds <= 10 && props.remainingSeconds > 0 ? classes.blinkingStatusText : classes.statusText);
  if (props.finished) {
    return <div className={cx}>Time's up!</div>;
  }
  if (props.running && props.remainingSeconds <= props.totalSeconds / 2) {
    return <div className={cx}>More than halfway there!</div>;
  }
  // To keep the vertical spacing consistent
  return <div className={cx}>&nbsp;</div>;
};

export default StatusText;
