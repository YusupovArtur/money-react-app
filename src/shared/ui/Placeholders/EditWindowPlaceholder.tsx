import { CSSProperties, FC } from 'react';
import { ModalWindowContainer } from 'shared/containers';
import { PageContentPlaceholder } from 'shared/ui';

interface EditWindowPlaceholderProps {
  style?: CSSProperties;
}

export const EditWindowPlaceholder: FC<EditWindowPlaceholderProps> = ({ style = { margin: 'auto' } }) => {
  return (
    <ModalWindowContainer style={style} isOpened={true}>
      <PageContentPlaceholder className="mt-1 mb-4" />
      <div className="d-flex">
        <button className="btn btn-primary disabled placeholder flex-grow-1 me-2"></button>
        <button className="btn btn-danger disabled placeholder col-3"></button>
      </div>
    </ModalWindowContainer>
  );
};
