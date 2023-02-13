import { useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changedActiveFilter } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const btnsRef = useRef([]);
  const addToRefArr = (e, index) => {
    btnsRef.current[index] = e;
  };

  const handleClick = useCallback((e) => {
    btnsRef.current.forEach((btn) => btn.classList.remove('active'));
    btnsRef.current.forEach((btn) => {
      if (btn === e.target) btn.classList.add('active');
    });
    const element = e.target.getAttribute('data-element');
    dispatch(changedActiveFilter(element));
  });

  const btns = useMemo(
    () =>
      filters.map(({ name, className, value }, i) => (
        <button
          data-element={value}
          key={i}
          ref={(e) => addToRefArr(e, i + 1)}
          className={`btn ${className}`}
          onClick={handleClick}>
          {name}
        </button>
      )),
    [filters]
  );

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          <button
            data-element=''
            className='btn btn-outline-dark active'
            ref={(e) => addToRefArr(e, 0)}
            onClick={handleClick}>
            Все
          </button>
          {btns}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
