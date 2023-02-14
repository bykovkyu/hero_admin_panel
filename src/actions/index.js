import { createAction } from '@reduxjs/toolkit';

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError));
};

/* export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
}; */

export const heroesFetching = createAction('HEROES_FETCHING');

/* export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
}; */

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const heroCreated = (hero) => ({ type: 'HERO_CREATED', payload: hero });

export const heroDeleted = (id) => ({ type: 'HERO_DELETED', payload: id });

export const filtersFetching = () => ({ type: 'FILTERS_FETCHING' });

export const filtersFetched = (filters) => ({ type: 'FILTERS_FETCHED', payload: filters });

export const filtersFetchingError = () => ({ type: 'FILTERS_FETCHING_ERROR' });

export const changedActiveFilter = (activeFilter) => ({
  type: 'CHANGED_ACTIVE_FILTER',
  payload: activeFilter,
});

/* export const changedActiveFilter = (activeFilter) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'CHANGED_ACTIVE_FILTER',
      payload: activeFilter,
    });
  }, 300);
}; */
