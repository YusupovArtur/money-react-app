import { FC } from 'react';

export const LightThemeIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-sun-fill"
      viewBox="0 0 16 16"
    >
      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
  );
};

export const DarkThemeIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      fill="currentColor"
      width={iconSize}
      height={iconSize}
      viewBox="-2.4 -2.4 28.80 28.80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z" />
        <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z" />
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      </g>
    </svg>
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width={iconSize}
    //   height={iconSize}
    //   fill="currentColor"
    //   className="bi bi-moon-stars-fill"
    //   viewBox="0 0 16 16"
    // >
    //   <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278" />
    //   <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
    // </svg>
  );
};

export const AutoThemeIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg fill="currentColor" width={iconSize} height={iconSize} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M13,7c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1s1,0.4,1,1v1C14,6.6,13.6,7,13,7z" />
        <path d="M5.9,9.9c-0.3,0-0.5-0.1-0.7-0.3L3.1,7.5c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.1,2.1c0.4,0.4,0.4,1,0,1.4C6.4,9.8,6.2,9.9,5.9,9.9z" />
        <path d="M3,17H2c-0.6,0-1-0.4-1-1s0.4-1,1-1h1c0.6,0,1,0.4,1,1S3.6,17,3,17z" />
        <path d="M3.8,26.2c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.1-2.1c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.1,2.1	C4.3,26.1,4.1,26.2,3.8,26.2z" />
        <path d="M13,28c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1s1,0.4,1,1v1C14,27.6,13.6,28,13,28z" />
        <path d="M22,25c-5,0-9-4-9-9s4-9,9-9s9,4,9,9S27,25,22,25z" />
        <path d="M11,16c0-3.1,1.3-5.9,3.3-7.9C13.9,8,13.5,8,13,8c-4.4,0-8,3.6-8,8s3.6,8,8,8c0.5,0,0.9,0,1.3-0.1C12.3,21.9,11,19.1,11,16z" />
      </g>
    </svg>
  );
};