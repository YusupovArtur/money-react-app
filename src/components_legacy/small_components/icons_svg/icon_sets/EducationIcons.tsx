import { FC } from 'react';

const EducationIcon: FC<{ iconName: string; iconSize: string }> = ({ iconName, iconSize }) => {
  switch (iconName) {
    case 'Book':
      return <BookIconSVG iconSize={iconSize} />;
    case 'BookFill':
      return <BookFillIconSVG iconSize={iconSize} />;
    case 'Journal':
      return <JournalIconSVG iconSize={iconSize} />;
    case 'HatGraduate':
      return <HatGraduateIconSVG iconSize={iconSize} />;
    // case '':
    //   return <IconSVG iconSize={iconSize} />;

    default:
      return <div style={{ width: iconSize, height: iconSize }}></div>;
  }
};

export default EducationIcon;

// const IconSVG: FC<{ iconSize: string }> = ({ iconSize }) => {
//   return (

//   );
// };

const BookIconSVG: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-book"
      viewBox="0 0 16 16"
    >
      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
    </svg>
  );
};

const BookFillIconSVG: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-book-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
    </svg>
  );
};

const JournalIconSVG: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-journal"
      viewBox="0 0 16 16"
    >
      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
    </svg>
  );
};

const HatGraduateIconSVG: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg width={iconSize} height={iconSize} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14.5V11.165L8.00843 13.4663C9.24174 14.1743 10.7583 14.1743 11.9916 13.4663L16 11.165V14.5C16 14.6326 15.9473 14.7598 15.8536 14.8536L15.852 14.8551L15.8496 14.8574L15.8428 14.8642L15.8201 14.8859C15.801 14.9039 15.7741 14.9288 15.7394 14.9596C15.6701 15.0213 15.5696 15.1067 15.4389 15.2079C15.1777 15.41 14.7948 15.6761 14.2978 15.9412C13.3033 16.4716 11.8479 17 10 17C8.15211 17 6.69675 16.4716 5.70221 15.9412C5.20518 15.6761 4.82226 15.41 4.5611 15.2079C4.43043 15.1067 4.32994 15.0213 4.26059 14.9596C4.22591 14.9288 4.19898 14.9039 4.17992 14.8859L4.15724 14.8642C4.05938 14.7684 4 14.6378 4 14.5Z"></path>
      <path d="M18.7489 8.43369L11.4937 12.599C10.5687 13.1301 9.4313 13.1301 8.50632 12.599L2 8.86367L2 13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V8.00008C1 7.81007 1.10598 7.64474 1.26206 7.56014L8.5063 3.40104C8.85317 3.20189 9.22992 3.07743 9.61413 3.02764C9.73586 3.01187 9.85834 3.00359 9.98086 3.00281C10.3739 3.0003 10.7674 3.07496 11.1377 3.22679C11.2591 3.27658 11.3781 3.33466 11.4937 3.40104L18.749 7.56646C18.9042 7.65561 19 7.82101 19 8.00008C19 8.17914 18.9042 8.34454 18.7489 8.43369Z"></path>
    </svg>
  );
};
