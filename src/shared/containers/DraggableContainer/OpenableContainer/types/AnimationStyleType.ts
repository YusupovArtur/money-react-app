import { SizeType } from './SizeType.ts';

export type AnimationStyleType = {
  top?: SizeType;
  bottom?: SizeType;
  left?: SizeType;
  right?: SizeType;

  margin?: SizeType;
  marginTop?: SizeType;
  marginBottom?: SizeType;
  marginLeft?: SizeType;
  marginRight?: SizeType;

  padding?: SizeType;
  paddingTop?: SizeType;
  paddingBottom?: SizeType;
  paddingLeft?: SizeType;
  paddingRight?: SizeType;

  height?: SizeType;
  width?: SizeType;

  borderWidth?: SizeType;
};
