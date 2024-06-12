import React from 'react';

const HouseIcon: React.FC<{ iconName: string; iconSize: string }> = ({ iconName, iconSize }) => {
  switch (iconName) {
    case 'Furniture':
      return <FurnitureIconSVG iconSize={iconSize}></FurnitureIconSVG>;
    case 'Spray':
      return <SprayIconSVG iconSize={iconSize}></SprayIconSVG>;
    case 'Washing':
      return <WashingIconSVG iconSize={iconSize}></WashingIconSVG>;
    case 'Hammer':
      return <HammerIconSVG iconSize={iconSize}></HammerIconSVG>;
    case 'Tools':
      return <ToolsIconSVG iconSize={iconSize}></ToolsIconSVG>;
    case 'Brush':
      return <BrushIconSVG iconSize={iconSize}></BrushIconSVG>;
    // case '':
    //   return <IconSVG iconSize={iconSize}></IconSVG>;

    default:
      return <div style={{ width: iconSize, height: iconSize }}></div>;
  }
};

export default HouseIcon;

// const IconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
//   return (

//   );
// };

const FurnitureIconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg width={iconSize} height={iconSize} fill="currentColor" viewBox="-1.5 0 19 19" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.461 7.02a1.61 1.61 0 0 1 1.61 1.611v2.456h7.857V8.63a1.61 1.61 0 1 1 1.988 1.566v4.634a.476.476 0 0 1-.475.475H2.559a.476.476 0 0 1-.475-.475v-4.634A1.61 1.61 0 0 1 2.46 7.02zm1.059-.894a2.68 2.68 0 0 0-.227-.084V4.669A1.111 1.111 0 0 1 4.4 3.56h7.198a1.111 1.111 0 0 1 1.108 1.109v1.373a2.679 2.679 0 0 0-.227.084 2.717 2.717 0 0 0-1.66 2.505v1.347H5.18V8.631a2.72 2.72 0 0 0-1.66-2.505z"></path>
    </svg>
  );
};

const SprayIconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
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
      <path d="M410.094,81.653l-29.653-44.478C364.923,13.896,338.958,0,310.983,0c-8.049,0-189.921,0-197.998,0 c-9.22,0-16.696,7.475-16.696,16.696v66.783c0,9.22,7.475,16.696,16.696,16.696h50.087v16.696 c0,29.591-17.744,44.22-28.501,54.978c-6.52,6.52-6.52,17.091,0,23.611c6.519,6.52,17.091,6.521,23.611,0 c11.409-11.409,31.048-28.255,36.834-61.892h18.143c9.206,0,16.696,7.49,16.696,16.696v52.959 c-19.433,6.891-33.391,25.449-33.391,47.214v33.391c0,9.206-7.49,16.696-16.696,16.696h-33.391 c-27.618,0-50.087,22.469-50.087,50.087v111.304c0,27.618,22.469,50.087,50.087,50.087h200.348 c27.618,0,50.087-22.469,50.087-50.087V250.435c0-27.618-22.469-50.087-50.087-50.087h-16.696v-50.087 c0-9.206,7.49-16.696,16.696-16.696h35.587c12.338,0,23.619-6.757,29.44-17.635C417.572,105.052,416.938,91.917,410.094,81.653z M163.072,66.783H129.68V33.391h33.391V66.783z M129.68,350.609c0-9.206,7.49-16.696,16.696-16.696h33.391 c27.618,0,50.087-22.469,50.087-50.087v-33.391c0-9.206,7.49-16.696,16.696-16.696h16.696v133.565H129.68V350.609z M363.418,461.913c0,9.206-7.49,16.696-16.696,16.696H146.375c-9.206,0-16.696-7.49-16.696-16.696v-61.217h133.565v27.826 c0,9.22,7.475,16.696,16.696,16.696c9.22,0,16.696-7.475,16.696-16.696v-27.826h66.783V461.913z M263.246,200.348v-33.391h33.39 v33.391H263.246z M346.723,233.739c9.206,0,16.696,7.49,16.696,16.696v116.87h-66.783V233.739h16.696H346.723z M346.723,100.174 c-21.766,0-40.323,13.959-47.215,33.391h-39.135c-6.891-19.433-25.449-33.391-47.214-33.391h-16.696c0-7.312,0-58.286,0-66.783 h114.52c16.785,0,32.364,8.338,41.675,22.304l29.645,44.478H346.723z"></path>
    </svg>
  );
};

const WashingIconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M9 3C7.3550302 3 6 4.3550302 6 6L6 44C6 45.64497 7.3550302 47 9 47L41 47C42.64497 47 44 45.64497 44 44L44 6C44 4.3550302 42.64497 3 41 3L9 3 z M 9 5L41 5C41.56503 5 42 5.4349698 42 6L42 44C42 44.56503 41.56503 45 41 45L9 45C8.4349698 45 8 44.56503 8 44L8 6C8 5.4349698 8.4349698 5 9 5 z M 31 8 A 2 2 0 0 0 29 10 A 2 2 0 0 0 31 12 A 2 2 0 0 0 33 10 A 2 2 0 0 0 31 8 z M 37 8 A 2 2 0 0 0 35 10 A 2 2 0 0 0 37 12 A 2 2 0 0 0 39 10 A 2 2 0 0 0 37 8 z M 25 15C18.58765 15 13.347947 20.063149 13.03125 26.398438 A 1.0003647 1.0003647 0 0 0 13.011719 26.783203C13.010406 26.856105 13 26.926791 13 27C13 33.615466 18.384534 39 25 39C31.613644 39 37 33.615686 37 27C37 26.927438 36.989577 26.8574 36.988281 26.785156 A 1.0003647 1.0003647 0 0 0 36.96875 26.390625C36.653041 20.187263 31.591575 15.26567 25.355469 15.072266 A 1.0001 1.0001 0 0 0 25 15 z M 25 17C29.728146 17 33.668186 20.265017 34.716797 24.667969C33.727371 24.214818 32.787337 24.018265 32.021484 24.001953C30.59388 23.971945 29.487301 24.586074 28.445312 25.080078C27.403325 25.574082 26.404985 26 25 26C23.595015 26 22.596676 25.574082 21.554688 25.080078C20.513209 24.586316 19.407059 23.97259 17.980469 24.001953L17.978516 24.001953C17.21168 24.017756 16.272368 24.214606 15.283203 24.667969C16.331391 20.264926 20.269992 17 25 17 z M 18.019531 26 A 1.0001 1.0001 0 0 0 18.021484 26C18.82988 25.98301 19.606254 26.369473 20.697266 26.886719C21.78823 27.403965 23.172985 28 25 28C26.827015 28 28.211723 27.403965 29.302734 26.886719C30.393746 26.369473 31.17012 25.983008 31.978516 26C32.628832 26.013851 33.818619 26.308572 34.994141 27.136719C34.92042 32.606917 30.486181 37 25 37C19.51166 37 15.079544 32.607128 15.005859 27.136719C16.181458 26.308358 17.370799 26.013159 18.019531 26 z"></path>
    </svg>
  );
};

const HammerIconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-hammer"
      viewBox="0 0 16 16"
    >
      <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
    </svg>
  );
};

const ToolsIconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-tools"
      viewBox="0 0 16 16"
    >
      <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
    </svg>
  );
};

const BrushIconSVG: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-brush-fill"
      viewBox="0 0 16 16"
    >
      <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z" />
    </svg>
  );
};
