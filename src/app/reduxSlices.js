import { createSlice } from '@reduxjs/toolkit';
/**
 * Redux slice that was planned to cache search results and use setSelector to bypass the API
 * if the show is in the Redux state.  Left out due to time constraints.
 */
export const showListSlice = createSlice({
  name: 'showList',
  initialState: {
    showValues: [],
  },
  reducers: {
    /**
     * @method addToState
     * @param state
     * @param action
     * @description the reducer will do three things:
     *  - remove the current version of the show from state in case of mutation
     *  - append the show to the state
     *  - ensure there's no duplicates
     */
    addToState: (state, action) => {
      state.showValues = state.showValues.filter(val => val.show.id !== action.payload.show.id);
      state.showValues.push(action.payload);
      state.showValues = [...new Set(state.showValues)];
    }
  }
});

export const { addToState } = showListSlice.actions;

export default showListSlice.reducer;
