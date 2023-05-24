import React, { useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { SlNote } from 'react-icons/sl';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { ChatListContacts } from './ChatListContacts';
import { validPhone } from '../function/validPhone';
import { dataContacts } from '../function/dataContacts';
import '../styles/chatlist.scss';

function ChatList() {
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contacts, setContacts] = useState(() => {
    const data = sessionStorage.getItem('Contacts');
    if (!data) return [];
    return JSON.parse(data);
  });

  const valuePhone = e => {
    const value = validPhone(e.target.value);
    setPhone(value);
    if (value.length === 0) return setErrorMessage('Вводите только буквы');
    setPhone(value);
    setErrorMessage('');
  };

  const searchPhone = () => {
    if (phone.length < 11) return setErrorMessage('Неправильно набран номер!');
    if (phone[0] === '8' || phone[0] === '7') {
      let formatPhone = phone.split('');
      formatPhone[0] = '7';

      const err = dataContacts(formatPhone.join(''));
      if (err) return setErrorMessage('Чат с таким номером уже существует!');

      setContacts(JSON.parse(sessionStorage.getItem('Contacts')));
      setPhone('');
    } else {
      return setErrorMessage('Неправильно набран номер!');
    }
  };

  return (
    <div className='chatlist'>
      <div className='chatlist__info'>
        <div className='chatlist__info-top'>
          <h1>Чаты</h1>
          <div className='configuration'>
            <button title='Создать новый чат'>
              <SlNote />
            </button>
            <button title='Настройки фильтров'>
              <IoEllipsisHorizontal />
            </button>
          </div>
        </div>

        <div className='chatlist__info-bottom'>
          <input
            type='tel'
            value={phone}
            placeholder='Поиск или новый чат'
            onChange={valuePhone}
            maxlength='11'
            onBlur={() => setErrorMessage('')}
          />
          <small>{errorMessage}</small>
          <button onClick={searchPhone}>
            <VscSearch />
          </button>
        </div>
      </div>

      <ChatListContacts contacts={contacts} />
    </div>
  );
}

export default ChatList;
