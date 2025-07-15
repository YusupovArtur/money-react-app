export const getOpenableContainersState = (props: {
  index: number;
  startIndex: number;
  overIndex: number;
  length: number;
  isOldBehaviour?: boolean;
}): {
  up: boolean;
  down: boolean;
} => {
  const { index, startIndex, overIndex, length, isOldBehaviour = false } = props;

  if (isOldBehaviour) {
    const aboveIndex = index - 1;
    if (
      index === overIndex &&
      index !== startIndex &&
      aboveIndex !== startIndex &&
      (index !== length || length - 1 !== startIndex)
    ) {
      return { up: true, down: false };
    }
  } else {
    if (index === overIndex && index !== startIndex) {
      if (startIndex < overIndex) {
        return { up: false, down: true };
      } else {
        return { up: true, down: false };
      }
    }
  }

  return { up: false, down: false };
};
