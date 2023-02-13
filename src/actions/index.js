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

export const heroCreated = (hero) => ({ type: 'HERO_CREATED', payload: hero });

export const heroDeleted = (id) => ({ type: 'HERO_DELETED', payload: id });

export const filtersFetching = () => ({ type: 'FILTERS_FETCHING' });

export const filtersFetched = (filters) => ({ type: 'FILTERS_FETCHED', payload: filters });

export const filtersFetchingError = () => ({ type: 'FILTERS_FETCHING_ERROR' });

export const changedActiveFilter = (activeFilter) => ({
  type: 'CHANGED_ACTIVE_FILTER',
  payload: activeFilter,
});
