export const getCursorShift = (oldString: string, newString: string, selectionStart: number | null): number => {
  oldString = oldString.replace(/,/g, '.');
  let shift: number = 0;
  let j: number = 0;
  const removedChars: string[] = [];

  for (let i = 0; i < oldString.length; i++) {
    if (newString[j] === undefined) {
      break;
    }

    if (oldString[i] === newString[j]) {
      j++;
    } else {
      removedChars.push(oldString[i]);
      shift++;
    }
  }

  if (selectionStart && oldString[selectionStart - 1] === '.' && removedChars.includes('.')) {
    shift--;
  }

  return shift;
};
