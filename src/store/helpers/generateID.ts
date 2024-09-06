export const generateID = (length: number = 20): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const idArray = new Array(length);

  const getRandomInt = (n: number) => {
    return Math.floor(Math.random() * (n + 1));
  };

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(charactersLength);
    idArray[i] = characters[randomIndex];
  }

  return idArray.join('');
};
