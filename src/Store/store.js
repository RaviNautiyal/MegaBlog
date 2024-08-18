import {configureStore} from '@reduxjs/toolkit';
import Authreducers from './AuthSlice.js'
const store = configureStore({ reducer: { auth: Authreducers }, });
export default store

