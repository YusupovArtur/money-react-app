import { FC } from 'react';
import { ContentIconSetProps } from 'shared/ui/ContentIcon/ContentIconSets/types/ContentIconSetProps.ts';

export const HealthIcons: FC<ContentIconSetProps> = ({ iconName, iconSize }) => {
  switch (iconName) {
    case 'Cross':
      return <MedicineCrossIcon iconSize={iconSize} />;
    case 'Capsule':
      return <CapsuleIcon iconSize={iconSize} />;
    case 'CapsulePill':
      return <CapsulePillIcon iconSize={iconSize} />;
    case 'Hospital':
      return <HospitalIcon iconSize={iconSize} />;
    case 'HospitalFill':
      return <HospitalFillIcon iconSize={iconSize} />;
    case 'Tooth':
      return <ToothIcon iconSize={iconSize} />;
    case 'Stethoscope':
      return <StethoscopeIcon iconSize={iconSize} />;
    default:
      return null;
  }
};

const MedicineCrossIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg width={iconSize} height={iconSize} fill="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M49 17c0-.55-.45-1-1-1h-13c-.55 0-1-.45-1-1v-13c0-.55-.45-1-1-1h-16c-.55 0-1 .45-1 1v13c0 .55-.45 1-1 1h-13c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h13c.55 0 1 .45 1 1v13c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-13c0-.55.45-1 1-1h13c.55 0 1-.45 1-1v-16z"></path>
    </svg>
  );
};

const CapsuleIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-capsule"
      viewBox="0 0 16 16"
    >
      <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" />
    </svg>
  );
};

const CapsulePillIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-capsule-pill"
      viewBox="0 0 16 16"
    >
      <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536 4.607 4.707ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-.5 1.042a3 3 0 0 0 0 5.917V9.042Zm1 5.917a3 3 0 0 0 0-5.917v5.917Z" />
    </svg>
  );
};

const HospitalIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-hospital"
      viewBox="0 0 16 16"
    >
      <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5Zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9h-.5Zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Z" />
      <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1V1Zm2 14h2v-3H7v3Zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm0-14H6v1h4V1Zm2 7v7h3V8h-3Zm-8 7V8H1v7h3Z" />
    </svg>
  );
};

const HospitalFillIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-hospital-fill"
      viewBox="0 0 16 16"
    >
      <path d="M6 0a1 1 0 0 0-1 1v1a1 1 0 0 0-1 1v4H1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h6v-2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V16h6a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3V3a1 1 0 0 0-1-1V1a1 1 0 0 0-1-1H6Zm2.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM2.25 9h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 9.75v-.5A.25.25 0 0 1 2.25 9Zm0 2h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5ZM13.25 9h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25Z" />
    </svg>
  );
};

const ToothIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} fill="currentColor" viewBox="0 0 32 32">
      <path d="M28.36572,8.79882A6.55,6.55,0,0,0,26.85889,2.0537a6.54575,6.54575,0,0,0-6.6792-1.772l-3.16162.93115a3.59548,3.59548,0,0,1-2.03662,0L11.82031.28173a6.54607,6.54607,0,0,0-6.6792,1.772A6.55,6.55,0,0,0,3.63428,8.79882l2.166,6.40527a3.65833,3.65833,0,0,1-.02051,2.37109A15.61777,15.61777,0,0,0,6.78711,29.71972l.68555,1.29736a1.81042,1.81042,0,0,0,1.68408.9834A1.83457,1.83457,0,0,0,10.7832,30.9248l3.42041-7.46289a1.976,1.976,0,0,1,3.59277,0L21.2168,30.9248a1.83457,1.83457,0,0,0,1.62646,1.07568l.05322.001a1.83355,1.83355,0,0,0,1.63086-.98437l.64209-1.21436a15.83488,15.83488,0,0,0,1.02295-12.311,3.62278,3.62278,0,0,1,.00732-2.2876Zm-3.12256,9.00781a14.82848,14.82848,0,0,1-.958,11.5293l-.6416,1.21436a.80181.80181,0,0,1-.77246.45068.82965.82965,0,0,1-.74512-.49316l-3.42041-7.46289a2.97644,2.97644,0,0,0-5.41113,0L9.874,30.50781a.82965.82965,0,0,1-.74512.49316.81519.81519,0,0,1-.772-.45068l-.68555-1.29736A14.65511,14.65511,0,0,1,6.752,17.81982a4.58877,4.58877,0,0,0-.00439-2.936l-2.166-6.40527A5.567,5.567,0,0,1,5.86182,2.74658a5.56379,5.56379,0,0,1,5.67627-1.50586l3.16064.93115a4.59194,4.59194,0,0,0,.83014.15411A4.99509,4.99509,0,0,0,14.269,4.67529a.50024.50024,0,0,0,.38037.59619.5185.5185,0,0,0,.1084.01172.50015.50015,0,0,0,.48779-.39209,4.0241,4.0241,0,0,1,2.2608-2.77979l2.95551-.87061a5.56506,5.56506,0,0,1,5.67627,1.50586,5.567,5.567,0,0,1,1.28027,5.73193l-2.166,6.40527A4.63227,4.63227,0,0,0,25.24316,17.80663Z"></path>
    </svg>
  );
};

const StethoscopeIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} fill="currentColor" viewBox="0 0 80 80">
      <path d="M25 40.872V57c0 9.925 8.075 18 18 18s18-8.075 18-18V43.809c5.112-.944 9-5.427 9-10.809 0-6.065-4.935-11-11-11s-11 4.935-11 11c0 5.382 3.888 9.865 9 10.809V57c0 7.72-6.28 14-14 14s-14-6.28-14-14V40.872c8.433-.995 15-8.176 15-16.872V5H32v4h8v15c0 7.168-5.832 13-13 13s-13-5.832-13-13V9h8V5H10v19c0 8.696 6.567 15.877 15 16.872zM52 33c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z"></path>
    </svg>
  );
};
