import React from 'react';
import { RxAvatar } from 'react-icons/rx';
import { BsCameraVideo } from 'react-icons/bs';
import { IoCallOutline } from 'react-icons/io5';
import { VscSearch } from 'react-icons/vsc';

function HeaderChat({ userPhone }) {
  return (
    <div>
      <header className='header'>
        <div className='header__profile' title='данные контакта'>
          <RxAvatar />
          <div>
            <h2>{userPhone}</h2>
            <span>был(-а) вчера в 23:38</span>
          </div>
        </div>

        <div className='header__phone-call'>
          <div>
            <BsCameraVideo />
            <IoCallOutline />
          </div>
          <VscSearch />
        </div>
      </header>
    </div>
  );
}

export default HeaderChat;
