import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/UserProfile/ProfileSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('profileState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('profileState', serializedState);
  } catch (err) {
    // Handle errors here
    console.error('Error saving state:', err);
  }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        profiles: profileReducer
    },
    preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;