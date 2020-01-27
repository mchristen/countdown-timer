import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import classes from '*.module.css';

function valuetext(value: number) {
  return `${value}x`;
}

const sliderStops = [
  {
    value: 1,
    label: '1x',
  },
  {
    value: 1.5,
    label: '1.5x',
  },
  {
    value: 2,
    label: '2x',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedSlider: {
      maxWidth: "240px",
    },
  })
);

interface SpeedControlFormProps {
  onChange: (speedMultiplier: number) => void;
}
const SpeedControlForm: React.FC<SpeedControlFormProps> = (props: SpeedControlFormProps) => {
  const classes = useStyles();
  return (
    <Slider
      className={classes.speedSlider}
      defaultValue={1}
      step={null}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      min={0}
      max={3}
      track={false}
      marks={sliderStops}
      onChange={(e: any, value: number | number[]) => props.onChange(value as number)}
    />
  );
};
export default SpeedControlForm;
