import { configureStore } from '@reduxjs/toolkit';
import showListSlice  from './reduxSlices';

export default configureStore({
  reducer: {
    showList: showListSlice
  },
});
