import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { HiOutlineLockClosed } from 'react-icons/hi';
import '../styles/introwindow.scss';

function IntroWindow() {
  return (
    <section className='intro'>
      <div className='whatsapp'>
        <BsWhatsapp />
        <h1>WhatsApp для всех</h1>
        <div style={{ textAlign: 'center' }}>
          <p>
            Вы можете отправлять и получать сообщения без необходимости
            оставлять телефон подключенным.
          </p>
          <p>
            Используйте WhatsApp одновременно на четырёх связанных устройствах и
            одном телефоне.
          </p>
        </div>
      </div>
      <span>
        <HiOutlineLockClosed /> Защищено сквозным шифрованием
      </span>
    </section>
  );
}

export default IntroWindow;
