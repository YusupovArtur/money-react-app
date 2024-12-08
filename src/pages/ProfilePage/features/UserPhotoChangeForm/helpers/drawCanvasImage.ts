export const drawCanvasImage = (props: {
  canvas: HTMLCanvasElement | null;
  image: HTMLImageElement;
  x: number;
  y: number;
  scale: number;
}) => {
  const { canvas, image, x, y, scale } = props;

  if (canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

    const imageSize: number = Math.min(image.width, image.height) * scale;
    const canvasContext: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (canvasContext) {
      canvasContext.drawImage(
        image,
        image.width / 2 + x - imageSize / 2,
        image.height / 2 + y - imageSize / 2,
        imageSize,
        imageSize,
        0,
        0,
        canvas.width,
        canvas.height,
      );
    }
  }
};
