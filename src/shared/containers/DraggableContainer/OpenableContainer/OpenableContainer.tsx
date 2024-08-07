import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { getAnimationStyleNumberState } from './helpers/getAnimationStyleNumberState.ts';
import { AnimationStyleState } from './types/AnimationStateTypes.ts';
import { getAnimationStyleStateFrame } from 'shared/containers/DraggableContainer/OpenableContainer/helpers/getAnimationStyleStateFrame.ts';

interface OpenableContainerProps<T extends AnimationStyleState = AnimationStyleState> {
  children: ReactNode;
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
}) => {
  const style1 = getAnimationStyleNumberState(styleString1);
  const style2 = getAnimationStyleNumberState(styleString2);
  const [style, setStyle] = useState<AnimationStyleState>(isOpened ? style2 : style1);

  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number | null>(null);
  const ratio = useRef<number>(isOpened ? 1 : 0);

  const animate = (time: number): void => {
    if (timeRef.current !== null) {
      ratio.current = Math.min(Math.max(ratio.current + ((time - timeRef.current) / duration) * (isOpened ? 1 : -1), 0), 1);
      const newStyleFrame = getAnimationStyleStateFrame(style1, style2, ratio.current);
      setStyle(newStyleFrame);
    }
    timeRef.current = time;
    console.log(ratio.current);

    if ((isOpened && ratio.current < 1) || (!isOpened && ratio.current > 0)) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      timeRef.current = null;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpened]);

  return <div style={style}>{children}</div>;
};
