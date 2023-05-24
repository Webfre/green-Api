import React, { createContext, useState } from 'react';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';
import '../styles/home.scss';

export const UserContext = createContext(null);

const Home = () => {
  const [userPhone, setUserPhone] = useState('');
  const [dataMessage, setDataMessage] = useState([]);
  const store = {
    userPhone,
    setUserPhone,
    dataMessage,
    setDataMessage,
  };

  return (
    <UserContext.Provider value={store}>
      <section className='home'>
        <ChatList />
        <Chat />
      </section>
    </UserContext.Provider>
  );
};

export default Home;
