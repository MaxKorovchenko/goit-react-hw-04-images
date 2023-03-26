import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { DivModal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ close, children }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [close]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <DivModal>{children}</DivModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};
