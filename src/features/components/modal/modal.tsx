import React from 'react';

import { Button } from '@components/button';
import { CrossIcon, XIcon } from 'lucide-react';

import classes from './modal.module.scss';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (isOpen) return null;

  return (
    <div
      className={classes.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={classes.modalWrapper}>
        <div className={classes.modal}>
          <Button onClick={onClose} className={classes.closeButton}>
            <XIcon className={classes.closeIcon} />
          </Button>
          <div className={classes.contentWrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
};
