import { CSSProperties, FC } from 'react';
import { PageContentPlaceholder } from 'shared/ui';
import { ModalWindowContainer } from 'shared/containers';

interface EditWindowPlaceholderProps {
  style?: CSSProperties;
  zIndex?: number;
}

export const EditWindowPlaceholder: FC<EditWindowPlaceholderProps> = ({ style = { margin: 'auto' }, zIndex = 2 }) => {
  return (
    <ModalWindowContainer style={style} isOpened={true} zIndex={zIndex} animated={false}>
      <PageContentPlaceholder className="mt-1 mb-4" />
      <div className="d-flex">
        <button className="btn btn-primary disabled placeholder flex-grow-1 me-2"></button>
        <button className="btn btn-danger disabled placeholder col-3"></button>
      </div>
    </ModalWindowContainer>
  );
};
