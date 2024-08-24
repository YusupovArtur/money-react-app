export const canselAnimation = (handle: number | null) => {
  if (handle !== null) {
    cancelAnimationFrame(handle);
  }
};
