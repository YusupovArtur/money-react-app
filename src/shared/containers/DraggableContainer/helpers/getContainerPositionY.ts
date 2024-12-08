export const getContainerPositionY = (container: HTMLDivElement | null): number | null => {
  if (container) {
    const rect = container.getBoundingClientRect();
    return rect.top;
  }

  return null;
};
