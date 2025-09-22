import { combineReducers } from '@reduxjs/toolkit';

const cardsReducer = (state = [], action) => state;
const favoritesReducer = (state = [], action) => state;

export const rootReducer = combineReducers({
  cards: cardsReducer,
  favorites: favoritesReducer,
});
