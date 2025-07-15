import { FC, HTMLProps, ReactNode, useEffect, useRef, useState } from 'react';
import { AnimationStyleType } from './types/AnimationStyleType.ts';
import { getAnimationStyleNumberState } from './helpers/getAnimationStyleNumberState.ts';
import { getAnimationStyleStateFrame } from './helpers/getAnimationStyleStateFrame.ts';
import { canselAnimation } from 'shared/containers/DraggableContainer/helpers/cancelAnimation.ts';
import { clamp } from 'shared/helpers';

// TODO: type that style1 === style2 in props
interface OpenableContainerProps<T extends AnimationStyleType = AnimationStyleType> extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  isOpened: boolean;
  duration: number;
  style1: T;
  style2: T;
}

export const OpenableContainer: FC<OpenableContainerProps> = ({
  children,
  isOpened,
  duration,
  style1: styleString1,
  style2: styleString2,
  style: outerStyle,
  ...props
}) => {
  const style1 = getAnimationStyleNumberState(styleString1);
  const style2 = getAnimationStyleNumberState(styleString2);
  const [style, setStyle] = useState<AnimationStyleType>(isOpened ? style2 : style1);

  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number | null>(null);
  const ratio = useRef<number>(isOpened ? 1 : 0);

  const animate = (time: number): void => {
    if (timeRef.current !== null) {
      ratio.current = clamp(ratio.current + ((time - timeRef.current) / duration) * (isOpened ? 1 : -1), 0, 1);
      const newStyleFrame = getAnimationStyleStateFrame(style1, style2, ratio.current);
      setStyle(newStyleFrame);
    }
    timeRef.current = time;

    if ((isOpened && ratio.current < 1) || (!isOpened && ratio.current > 0)) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      timeRef.current = null;
      canselAnimation(animationRef.current);
    }
  };

  useEffect(() => {
    canselAnimation(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      canselAnimation(animationRef.current);
    };
  }, [isOpened]);

  return (
    <div style={{ ...outerStyle, ...style }} {...props}>
      {children}
    </div>
  );
};
