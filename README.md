# A simple Countdown Timer

To use, enter the number of minutes in the countdown box and then press start, the timer will begin immediately. 

While the timer is active you may pause/resume the countdown with the button next to the time remaining.

To restart the timer it must first be paused, then the restart button becomes available. This is to prevent accidental restarting of the timer while it is running. 

To change the speed of the timer use the slider, the effect takes place immediately. 

## Timer implementation notes

This timer monitors the wall clock in order to provide precise countdowns. It uses an interval timer(100ms tickrate) to keep track of the state of the timer. A naive approach might just increment the seconds elapsed by the duration of each tick interval, but that breaks down under heavy load, ie. a tick might occur after 105ms instead of 100ms and your time elapsed will start to skew.

By using the wall clock and calculating the elapsed durations the tick interval becomes less important and more importantly will not skew the time elapsed based on scheduling inconsistencies.

## Screenshots

The default state, with 5 minutes as the default duration. 

![image](https://user-images.githubusercontent.com/1231534/73200275-11099b80-40fc-11ea-89fb-5a1a645ed669.png)

Halfway through the countdown a status text will appear indicating so. 

![image](https://user-images.githubusercontent.com/1231534/73200349-38606880-40fc-11ea-866d-5527ce0cb738.png)

When there are less than 20 seconds remaining the status text will turn red and then will start blinking when there is less than 10 seconds remaining. 

![image](https://user-images.githubusercontent.com/1231534/73200408-54fca080-40fc-11ea-9fc9-47d3349f44bc.png)

When the timer is over the status text will change to "Time's up!" and the start button will become enabled again.

![image](https://user-images.githubusercontent.com/1231534/73200443-680f7080-40fc-11ea-9d79-cb3f42caaaba.png)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
