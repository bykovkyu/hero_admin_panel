import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { useHttp } from '../../hooks/http.hook';
import { fetchFilters } from '../../actions';
import { filterActiveChanged } from './filtersSlice';

import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
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
