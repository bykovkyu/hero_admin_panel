import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { selectAll, filterActiveChanged, fetchFilters } from './filtersSlice';
import store from '../../store';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);
  const filters = selectAll(store.getState());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    //eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderBtns = (filters) =>
    filters.map(({ name, className, value }, i) => (
      <button
        key={i}
        className={`btn ${className} ${classNames({ active: activeFilter === value })}`}
        onClick={() => dispatch(filterActiveChanged(value))}>
        {name}
      </button>
    ));

  const elements = renderBtns(filters);

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          <button
            className={`btn btn-outline-dark ${classNames({ active: activeFilter === null })}`}
            onClick={() => dispatch(filterActiveChanged(null))}>
            Все
          </button>
          {elements}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
