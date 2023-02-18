import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [element, setElement] = useState('');

  const [createHero, { isLoading, isError }] = useCreateHeroMutation();

  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = selectAll(store.getState());
  const renderElements = (filters, status) => {
    if (isLoading) {
      return <option>Загрузка элементов</option>;
    } else if (isError) {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, value }) => (
        <option
          key={value}
          value={value}>
          {name}
        </option>
      ));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const hero = { id: uuidv4(), name, description: text, element };
    createHero(hero).unwrap();
    setName('');
    setText('');
    setElement('');
  };

  return (
    <form
      className='border p-4 shadow-lg rounded'
      onSubmit={onSubmit}>
      <div className='mb-3'>
        <label
          htmlFor='name'
          className='form-label fs-4'>
          Имя нового героя
        </label>
        <input
          required
          type='text'
          name='name'
          className='form-control'
          id='name'
          placeholder='Как меня зовут?'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='mb-3'>
        <label
          htmlFor='text'
          className='form-label fs-4'>
          Описание
        </label>
        <textarea
          required
          name='text'
          className='form-control'
          id='text'
          placeholder='Что я умею?'
          style={{ height: '130px' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className='mb-3'>
        <label
          htmlFor='element'
          className='form-label'>
          Выбрать элемент героя
        </label>
        <select
          required
          className='form-select'
          id='element'
          name='element'
          value={element}
          onChange={(e) => setElement(e.target.value)}>
          <option value=''>Я владею элементом...</option>
          {renderElements(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button
        type='submit'
        className='btn btn-primary'>
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
