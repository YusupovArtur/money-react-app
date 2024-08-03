import { FC } from 'react';

export const FoodIcons: FC<{ iconName: string; iconSize: `${number}rem` }> = ({ iconName, iconSize }) => {
  switch (iconName) {
    case 'BasketFill':
      return <BasketFillIcon iconSize={iconSize} />;
    case 'BasketFill2':
      return <BasketFill2Icon iconSize={iconSize} />;
    case 'Cart':
      return <CartIcon iconSize={iconSize} />;
    case 'CartFill':
      return <CartFillIcon iconSize={iconSize} />;
    case 'FastFood':
      return <FastFoodIcon iconSize={iconSize} />;
    case 'Cafe':
      return <CafeIcon iconSize={iconSize} />;
    case 'Cup':
      return <CupIcon iconSize={iconSize} />;
    default:
      return null;
  }
};

const BasketFillIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-basket-fill"
      viewBox="0 0 16 16"
    >
      <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
    </svg>
  );
};

const BasketFill2Icon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-basket2-fill"
      viewBox="0 0 16 16"
    >
      <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
    </svg>
  );
};

const CartIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-cart"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
};

const CartFillIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-cart-fill"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
};

const FastFoodIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path d="M507.845,187.486c-4.183-12.361-11.846-23.302-22.8-30.888c-8.199-5.714-18.096-9.445-29.273-10.948 c-1.162-7.413-4.127-14.651-8.986-21.04c-15.674-20.616-45.08-24.618-65.688-8.95c-46.158,35.106-96.576,57.552-144.028,71.152 c-47.384,13.613-91.822,18.263-124.217,18.235c-14.623,0.013-26.817-0.961-34.995-2.2c-25.602-3.835-49.471,13.808-53.317,39.407 c-0.95,6.34-0.574,12.569,0.905,18.422c-6.915,5.68-12.584,12.313-16.766,19.627c-5.697,9.932-8.686,21.088-8.679,32.44 c-0.021,17.971,7.496,36.289,22.185,51.42c14.692,15.173,36.4,27.276,65.152,34.111c22.045,5.233,47.126,7.614,73.935,7.628 c43.301-0.014,91.12-6.271,137.441-17.609c46.318-11.366,91.106-27.784,128.32-48.441c28.076-15.597,49.255-36.345,63.454-58.512 c14.184-22.188,21.485-45.775,21.513-67.476C512,204.635,510.657,195.733,507.845,187.486z M71.9,220.844 c1.156-5.978,6.942-9.889,12.924-8.734c2.458,0.515,3.811,1.399,4.827,2.067c1.006,0.689,1.677,1.309,2.276,1.887 c1.173,1.155,2.043,2.213,2.972,3.347c1.81,2.248,3.713,4.816,5.923,7.558c4.364,5.47,9.922,11.407,15.736,14.832 c3.894,2.303,7.67,3.542,11.759,3.549l0.797-0.014l0.059-0.022c0.212-0.09,0.686-0.327,1.326-0.772 c1.292-0.891,3.181-2.616,5.258-4.886c4.221-4.552,9.138-11.087,14.87-17.17c3.856-4.044,8.106-7.997,13.485-10.968 c3.073-1.678,6.57-3.007,10.454-3.536h-0.01c1.026-0.14,2.05-0.209,3.055-0.202c5.05,0.028,9.319,1.49,13.172,3.258 c3.859,1.788,7.388,3.995,10.805,6.271c6.779,4.551,13.276,9.458,18.524,12.201c3.476,1.878,6.205,2.568,7.332,2.512l0.731-0.076 c0.046,0,0.682-0.196,1.889-1.336c1.218-1.142,2.826-3.146,4.504-5.722c3.403-5.143,7.005-12.34,11.313-19.237 c2.92-4.6,6.135-9.166,10.631-13.064c2.568-2.206,5.645-4.197,9.312-5.429c2.815-0.939,5.627-1.288,8.265-1.288 c3.998,0.014,7.67,0.752,11.181,1.733c3.512,0.988,6.88,2.262,10.152,3.598c6.518,2.666,12.771,5.568,17.894,7.266 c3.39,1.155,6.229,1.684,7.823,1.656c1.086,0,1.538-0.167,1.732-0.258c0.098-0.042,0.682-0.362,1.622-1.761 c0.925-1.357,2.018-3.647,3.041-6.501c2.096-5.735,3.877-13.523,6.334-21.207c1.691-5.129,3.647-10.308,6.953-15.166 c1.893-2.756,4.315-5.436,7.51-7.565c3.159-2.102,6.514-3.264,9.73-3.94c3.236-0.668,6.389-0.87,9.5-0.87 c5.735,0.014,11.38,0.703,16.712,1.322c5.31,0.626,10.307,1.183,14.219,1.17c2.512,0.007,4.545-0.23,5.804-0.571 c1.301-0.348,1.719-0.689,1.859-0.821c4.433-4.176,11.414-3.968,15.59,0.459c4.176,4.441,3.974,11.422-0.46,15.59 c-3.438,3.244-7.524,5.102-11.386,6.104c-3.891,1.023-7.691,1.294-11.408,1.301c-5.784-0.014-11.456-0.71-16.787-1.323 c-5.31-0.633-10.294-1.183-14.143-1.176c-2.074,0-3.8,0.16-4.996,0.411c-1.204,0.251-1.817,0.571-2.026,0.71 c-0.348,0.216-1.225,1.031-2.248,2.826c-1.023,1.761-2.109,4.364-3.139,7.44c-2.088,6.18-3.856,14.074-6.486,21.708 c-1.796,5.102-3.926,10.217-7.726,14.915c-2.172,2.659-5.025,5.171-8.616,6.87l-0.014,0.007c0.007,0,0.007,0,0.007,0l-0.766,0.361 l0.758-0.361c-3.71,1.76-7.6,2.394-11.17,2.387c-4.023-0.014-7.747-0.738-11.303-1.719c-3.556-0.988-6.967-2.262-10.266-3.598 c-6.57-2.672-12.827-5.595-17.891-7.294c-3.354-1.155-6.135-1.67-7.59-1.643c-0.724,0-1.103,0.098-1.249,0.146 c-0.446,0.133-1.49,0.689-2.924,2.144c-1.423,1.434-3.118,3.668-4.85,6.375c-3.526,5.436-7.127,12.647-11.428,19.425 c-2.92,4.51-6.114,8.964-10.795,12.66c-2.669,2.088-5.954,3.911-9.82,4.781l-0.021,0.007c-1.866,0.418-3.734,0.605-5.558,0.605 c-4.465-0.006-8.484-1.078-12.132-2.505c-3.654-1.448-6.998-3.286-10.186-5.241c-6.347-3.918-12.19-8.386-17.247-11.637 c-3.338-2.185-6.319-3.772-8.251-4.406c-1.1-0.383-1.802-0.452-2.018-0.446h-0.094h-0.007c-0.873,0.112-2.216,0.571-4.026,1.761 c-1.796,1.183-3.942,3.048-6.191,5.38c-4.541,4.649-9.347,10.997-14.557,16.787c-3.532,3.863-7.182,7.6-12.151,10.468 c-2.826,1.601-6.26,2.916-10.221,3.125l0.118-0.007l-0.153,0.014c0.011,0,0.024-0.007,0.035-0.007l-0.073,0.007 c-0.633,0.02-1.291,0.041-1.973,0.041c-10.537,0-19.571-4.015-26.632-8.978c-7.103-4.997-12.584-11.004-16.843-16.154 c-2.822-3.424-5.123-6.514-6.709-8.512c-0.529-0.675-0.933-1.155-1.225-1.49C73.146,229.934,71.005,225.459,71.9,220.844z  M471.911,269.439c-12.208,19.05-30.672,37.285-55.596,51.134c-34.959,19.432-78.139,35.343-122.852,46.29 c-44.718,10.962-91.016,16.982-132.19,16.976c-25.48,0-48.998-2.311-68.837-7.03c-25.512-6.061-43.235-16.439-54.402-27.992 c-11.171-11.581-15.949-24.214-15.973-36.073c0.007-7.524,1.938-14.79,5.759-21.472c2.151-3.759,4.98-7.294,8.362-10.579 c7.012,7.739,16.631,13.203,27.767,14.873c14.021,2.088,30.287,3.223,48.904,3.229c41.001-0.02,93.27-5.616,150.046-21.86 c56.709-16.259,117.901-43.284,174.945-86.638c7.823-5.957,13.245-13.892,16.112-22.571c4.03,0.627,7.676,1.587,10.892,2.882 c8.414,3.46,14.337,8.86,18.569,16.106c4.19,7.238,6.521,16.502,6.521,27.151C489.965,230.533,484.126,250.403,471.911,269.439z" />
      </g>
    </svg>
  );
};

const CafeIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg width={iconSize} height={iconSize} fill="currentColor" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5,0l-1,5.5c-0.1464,0.805,1.7815,1.181,1.75,2L4,14c-0.0384,0.9993,1,1,1,1s1.0384-0.0007,1-1L5.75,7.5 c-0.0314-0.8176,1.7334-1.1808,1.75-2L6.5,0H6l0.25,4L5.5,4.5L5.25,0h-0.5L4.5,4.5L3.75,4L4,0H3.5z M12,0 c-0.7364,0-1.9642,0.6549-2.4551,1.6367C9.1358,2.3731,9,4.0182,9,5v2.5c0,0.8182,1.0909,1,1.5,1L10,14c-0.0905,0.9959,1,1,1,1 s1,0,1-1V0z"></path>
    </svg>
  );
};

const CupIcon: FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-cup-hot-fill"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5Z"
      />
      <path d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z" />
    </svg>
  );
};
