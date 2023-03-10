import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { DivModal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={closeModal}>
      <DivModal>{children}</DivModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};
