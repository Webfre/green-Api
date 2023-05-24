import React, { useContext } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { BsCheck2All } from 'react-icons/bs';
import { UserContext } from '../pages/Home';

export function ChatListContacts({ contacts }) {
  const { setUserPhone, setDataMessage } = useContext(UserContext);

  const switcUserPhone = phone => {
    setUserPhone(phone);
    setDataMessage([]);
  };

  return (
    <div className='chatlist__contacts'>
      <ul>
        {contacts.length === 0
          ? 'Новых чатов нет'
          : contacts.map(phone => (
              <li onClick={() => switcUserPhone(phone)}>
                <div className='avatar'>
                  <RxAvatar className='avatar-icon' />
                  <div className='avatar__info'>
                    <h2>{phone}</h2>
                    <div className='prev-message'>
                      <BsCheck2All className='check-icon' />
                      <span>сообщение...</span>
                    </div>
                  </div>
                </div>
                <div className='time'>20:54</div>
              </li>
            ))}
      </ul>
    </div>
  );
}
