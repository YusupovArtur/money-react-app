import { FC } from 'react';

const colorsHex: { [key: string]: string } = {
  white: '#ffffff',
  'gray-100': '#f8f9fa',
  'gray-400': '#ced4da',
  'gray-600': '#6c757d',
  'gray-900': '#212529',
  black: '#000000',

  'blue-300': '#6ea8fe',
  'blue-500': '#0d6efd',
  'blue-700': '#084298',
  'cyan-300': '#6edff6',
  'cyan-500': '#0dcaf0',
  'cyan-700': '#087990',

  'green-300': '#75b798',
  'green-500': '#198754',
  'green-700': '#0f5132',
  'teal-300': '#79dfc1',
  'teal-500': '#20c997',
  'teal-700': '#13795b',

  'red-300': '#ea868f',
  'red-500': '#dc3545',
  'red-700': '#842029',
  'pink-300': '#e685b5',
  'pink-500': '#d63384',
  'pink-700': '#801f4f',

  'yellow-300': '#ffda6a',
  'yellow-500': '#ffc107',
  'yellow-700': '#997404',
  'orange-300': '#feb272',
  'orange-500': '#fd7e14',
  'orange-700': '#984c0c',
};

const ColorMenu: FC<{ color: string; setColor: (colorHex: string) => void }> = ({ color, setColor }) => {
  const iconNameField: string[][] = [
    ['blue-300', 'blue-500', 'blue-700', 'green-300', 'green-500', 'green-700'],
    ['cyan-300', 'cyan-500', 'cyan-700', 'teal-300', 'teal-500', 'teal-700'],
    ['red-300', 'red-500', 'red-700', 'yellow-300', 'yellow-500', 'yellow-700'],
    ['pink-300', 'pink-500', 'pink-700', 'orange-300', 'orange-500', 'orange-700'],
    ['white', 'gray-100', 'gray-400', 'gray-600', 'gray-900', 'black'],
  ];

  return (
    <div className="dropdown">
      <button
        className="btn btn-body dropdown-toggle text-body d-flex justify-content-center align-items-center py-1 px-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          style={{ backgroundColor: color, width: '2.4rem', height: '2.4rem' }}
          className="d-flex justify-content-center align-items-center rounded-circle border"
        ></div>
      </button>
      <ul className="dropdown-menu p-2">
        <div className="container text-center">
          {iconNameField.map((row) => (
            <div className="row d-flex flex-nowrap" key={`${row[0]}${row[1]}${row[2]}${row[3]}${row[4]}`}>
              {row.map((colorName) => (
                <div
                  key={colorName}
                  className={`hover-scale-10 bordered rounded m-1 border ${
                    color === colorsHex[colorName] && 'bordered-emphasis'
                  }`}
                  onClick={() => setColor(colorsHex[colorName])}
                  style={{ backgroundColor: colorsHex[colorName], width: '2rem', height: '2rem' }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ColorMenu;
