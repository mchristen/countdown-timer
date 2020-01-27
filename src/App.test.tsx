import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the default state', () => {
  const { getByText, getByLabelText} = render(<App />);
  // Default state of the app shows a 0:00 timer.
  const linkElement = getByText(/0:00/i);
  expect(linkElement).toBeInTheDocument();
  const startButton = getByText(/start/i);
  expect(startButton).toBeEnabled();
  const pauseButton = getByLabelText(/pause/i);
//  expect(pauseButton).toBeDisabled();
});
