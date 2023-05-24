import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../pages/Home';
import { BsCheck2All } from 'react-icons/bs';
import { HiOutlineLockClosed } from 'react-icons/hi';

function MainChatList({ newMessage, dataMessage }) {
  const { setDataMessage } = useContext(UserContext);

  useEffect(() => {
    if (newMessage === null) return;
    setDataMessage([...dataMessage, newMessage]);
  }, [newMessage]);

  return (
    <main className='main'>
      <ul className='list__message'>
        {dataMessage.length === 0 ? (
          <li className='intro-message'>
            <HiOutlineLockClosed />
            Сообщения и звонки защищены сквозным шифрованием
          </li>
        ) : (
          dataMessage.map(({ textMessage, name, time, id }) => (
            <div className={`position ${name}`} key={id}>
              <li
                style={{
                  maxWidth: `${textMessage.length * 40}px`,
                }}
              >
                <h5>{textMessage}</h5>
                <span>
                  {time} <BsCheck2All />
                </span>
              </li>
            </div>
          ))
        )}
      </ul>
    </main>
  );
}

export default MainChatList;
