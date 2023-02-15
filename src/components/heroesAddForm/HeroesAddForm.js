import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { heroCreated } from '../heroesList/heroesSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [element, setElement] = useState('');

  const { filters, filtersLoadingStatus } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const renderElements = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрузка элементов</option>;
    } else if (status === 'error') {
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
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
      .then((res) => console.log(res, 'Успешно добавлен'))
      .then(() => dispatch(heroCreated(hero)))
      .catch((err) => console.log(err));
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
