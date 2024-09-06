import { FC, HTMLAttributes, ReactNode } from 'react';
import { ModalContainer } from 'shared/containers';
import { ModalContainerWrapper } from 'shared/ui';

/**
 * @param {onClose} props.onClose Callback for closing when close button clicked
 * @param {onCollapse} props.onCollapse Callback for close when outside clicked
 */
interface ModalWindowContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpened: boolean;
  /** Callback for closing when close button clicked */
  onClose?: (isOpened: boolean) => any;
  /** Callback for close when outside clicked */
  onCollapse?: (isOpened: boolean) => any;
  zIndex?: number;
  animated?: boolean;
}

export const ModalWindowContainer: FC<ModalWindowContainerProps> = ({ children, onClose, onCollapse, ...props }) => {
  const handleCloseButtonClick = () => {
    if (onClose) {
      onClose(false);
    }
  };

  return (
    <ModalContainer onCollapse={onCollapse} {...props}>
      <ModalContainerWrapper style={{ maxWidth: '35rem', width: '100vw' }}>
        <button type="button" onClick={handleCloseButtonClick} className="btn-close align-self-end"></button>
        {children}
      </ModalContainerWrapper>
    </ModalContainer>
  );
};
