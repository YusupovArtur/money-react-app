import { FC, HTMLAttributes, ReactNode } from 'react';
import { ModalContainer } from 'shared/containers';
import { ModalContainerWrapper } from 'shared/wrappers';

/**
 * @param {onClose} props.onClose Callback for closing when close button clicked
 * @param {onCollapse} props.onCollapse Callback for close when outside clicked
 */
interface ModalWindowContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpened: boolean;
  /** Callback for closing when close button clicked */
  onClose?: () => void;
  /** Callback for close when outside clicked */
  onCollapse?: () => void;
  zIndex?: number;
}

export const ModalWindowContainer: FC<ModalWindowContainerProps> = ({ children, onClose, onCollapse, ...props }) => {
  const handleCloseButtonClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <ModalContainer onCollapse={onCollapse} {...props}>
      <ModalContainerWrapper>
        <button type="button" onClick={handleCloseButtonClick} className="btn-close align-self-end" aria-label="Close"></button>
        {children}
      </ModalContainerWrapper>
    </ModalContainer>
  );
};
