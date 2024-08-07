export type Size = `${number}rem` | number;

export type AnimationStyleState = {
  top?: Size;
  bottom?: Size;
  left?: Size;
  right?: Size;

  margin?: Size;
  marginTop?: Size;
  marginBottom?: Size;
  marginLeft?: Size;
  marginRight?: Size;

  padding?: Size;
  paddingTop?: Size;
  paddingBottom?: Size;
  paddingLeft?: Size;
  paddingRight?: Size;

  height?: Size;
  width?: Size;
};

export type AnimationStyleNumberState<T extends AnimationStyleState = AnimationStyleState> = {
  [K in keyof T]: number;
};
