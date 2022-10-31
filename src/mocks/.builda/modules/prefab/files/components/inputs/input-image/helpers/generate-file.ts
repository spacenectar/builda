import CompletedCrop from '../types/completed-crop';

type TgenerateDownload = (
  canvas: HTMLCanvasElement,
  crop: CompletedCrop
) => string;

export const generateFile: TgenerateDownload = (canvas, crop) => {
  if (!crop || !canvas) {
    return '';
  }

  // generate file from canvas
  const file = canvas.toDataURL();
  return file;
};

export default generateFile;
