import React from 'react';
import { CSSTransition } from 'react-transition-group';

// Import components
import { Button } from 'components';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export interface Props {
  /**
   * The state of the modal (open or closed)
   */
  isOpen: boolean;
  /**
   * The set state for isOpen
   */
  setIsOpen: (isOpen: boolean) => void;
  /**
   * The optional action to be performed when the modal is closed
   */
  onClose?: () => void;
  /**
   * A custom classname to apply to the modal
   */
  className?: string;
  /**
   * The children to render inside the modal
   */
  children: React.ReactNode;
}

// Render component
export const Modal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onClose,
  className,
  children
}: Props) => {
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={800}
      classNames={{
        enter: styles['enter'],
        enterActive: styles['enter-active'],
        enterDone: styles['enter-done'],
        exit: styles['exit'],
        exitActive: styles['exit-active'],
        exitDone: styles['exit-done']
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles['modal-blackout']}>
        <div className={styles['modal-wrapper']}>
          <div className={`${styles['modal-content']} ${className || '\0'}`}>
            {children}
          </div>
          <Button
            className={styles['modal-close']}
            onClick={handleClose}
            circular
            iconOnly
            preset="close"
            label="close"
          />
        </div>
      </div>
    </CSSTransition>
  );
};

Modal.displayName = 'Modal';

export default Modal;
