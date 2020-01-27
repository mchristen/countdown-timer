export interface AppState {
  running: boolean;
  finished: boolean;
  paused: boolean;
  durationInSeconds: number;
  elapsedTime: number;
  speedMultiplier: number;
  lastTickAt: number;
}

export type AppAction =
  | { type: 'start'; duration: number }
  | { type: 'pause' }
  | { type: 'reset' }
  | { type: 'resume' }
  | { type: 'tick' }
  | { type: 'changeSpeedMultipler'; speedMultiplier: number };

const AppReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'start': {
      const durationInSeconds = action.duration * 60;
      const lastTickAt = new Date().getTime();
      return {
        ...state,
        running: true,
        paused: false,
        finished: false,
        elapsedTime: 0,
        lastTickAt,
        durationInSeconds,
      };
    }
    case 'pause': {
      return { ...state, paused: true };
    }
    case 'reset': {
      return {
        ...state,
        running: false,
        paused: false,
        finished: false,
        elapsedTime: 0,
      };
    }
    case 'resume': {
      return { ...state, lastTickAt: new Date().getTime(), paused: false };
    }
    case 'changeSpeedMultipler': {
      return { ...state, speedMultiplier: action.speedMultiplier };
    }
    case 'tick': {
      const currentTickAt = new Date().getTime();
      const timeElapsedSinceLastTick = (currentTickAt - state.lastTickAt) / 1000;
      const totalElapsedTime = state.elapsedTime + timeElapsedSinceLastTick * state.speedMultiplier;
      if (totalElapsedTime >= state.durationInSeconds) {
        return {
          ...state,
          finished: true,
          running: false,
          lastTickAt: currentTickAt,
          elapsedTime: state.durationInSeconds,
        };
      } else {
        return {
          ...state,
          lastTickAt: currentTickAt,
          elapsedTime: totalElapsedTime,
        };
      }
    }
  }
};

export default AppReducer;
