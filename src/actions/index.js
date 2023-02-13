export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const filtersFetched = (filters) => ({ type: 'FILTERS_FETCHED', payload: filters });

export const changedActiveFilter = (activeFilter) => ({
  type: 'CHANGED_ACTIVE_FILTER',
  payload: activeFilter,
});
