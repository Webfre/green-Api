import React, { useState, useContext, useEffect } from 'react';
import { SlEmotsmile } from 'react-icons/sl';
import { ImAttachment } from 'react-icons/im';
import { SlMicrophone } from 'react-icons/sl';
import { AiOutlineSend } from 'react-icons/ai';
import { UserContext } from '../pages/Home';
import { postMessage } from '../api/greenApi';
import { getMessageRealTime } from '../function/getMessageRealTime';
import MainChatList from './MainChatList';
import HeaderChat from './HeaderChat';
import IntroWindow from './IntroWindow';
import '../styles/chat.scss';

function Chat() {
  const { userPhone, setDataMessage, dataMessage } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [notify, setNotify] = useState('');

  // Отправка сообщения
  const sendMessage = async () => {
    const timeMessage = new Date();
    const idInstance = sessionStorage.getItem('idInstance');
    const apiToken = sessionStorage.getItem('apiToken');
    const body = { chatId: `${userPhone}@c.us`, message };
    const fullfild = await postMessage(idInstance, apiToken, body);
    if (!fullfild) return alert('Ваше сообщение не доставлено');

    setDataMessage([
      ...dataMessage,
      {
        textMessage: message,
        id: timeMessage.getMilliseconds(),
        name: 'right',
        time: `${timeMessage.getHours()}:${timeMessage.getMinutes()}`,
      },
    ]);
    setMessage('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Обновление в режиме реального времени - объединение в пул (pooling)
  const realTimeNotify = async () => {
    const resultTimer = await getMessageRealTime(dataMessage);
    if (Array.isArray(resultTimer)) {
      setDataMessage(resultTimer);
      setNotify('У вас новое сообщение');
      return;
    }
    setNotify(resultTimer);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      realTimeNotify();
    }, 3000);

    return () => clearInterval(timer);
  }, [notify]);

  return (
    <>
      {!userPhone ? (
        <IntroWindow />
      ) : (
        <div className='chat'>
          <HeaderChat userPhone={userPhone} />
          <MainChatList />

          <footer className='footer'>
            <div className='footer__emoji'>
              <SlEmotsmile />
              <ImAttachment />
            </div>

            <div className='footer__form-message'>
              <input
                type='text'
                value={message}
                placeholder='Введите сообщение'
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className='footer__voice'>
              {message.length !== 0 ? (
                <AiOutlineSend onClick={sendMessage} />
              ) : (
                <SlMicrophone />
              )}
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default Chat;
