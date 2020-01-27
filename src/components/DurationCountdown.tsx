import React from 'react';
import Typography from '@material-ui/core/Typography';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';

interface DurationCountdownProps {
  paused: boolean;
  running: boolean;
  totalSeconds: number;
  remainingSeconds: number;
  onPause: () => void;
  onResume: () => void;
}

const DurationCountdown: React.FC<DurationCountdownProps> = (props: DurationCountdownProps) => {
  const minutes = Math.floor(props.remainingSeconds / 60);
  const seconds = props.remainingSeconds - minutes * 60;
  const statusString = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  return (
    <Typography variant="h1" component="div">
      {statusString}
      <IconButton
        color="primary"
        disabled={!props.running}
        onClick={!props.paused ? props.onPause : props.onResume}
        aria-label="pause countdown timer"
      >
        {!props.paused ? <PauseCircleOutlineOutlinedIcon fontSize="large" /> : <PlayCircleOutlineOutlinedIcon fontSize="large"/>}
      </IconButton>
    </Typography>
  );
};

export default DurationCountdown;
