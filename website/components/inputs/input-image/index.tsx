/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';

// Import components
import { Button, Modal, Icons } from 'components';
import CompletedCrop from './types/completed-crop';
import generateFile from './helpers/generate-file';
import OnSelectFile from './types/on-select-file';
import centerAspectCrop from './helpers/center-aspect-crop';
import { useDebounceEffect } from 'lib/hooks';
import canvasPreview from './helpers/canvas-preview';

/* Prop Types */
export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The state of the input (not providing a value or setting the value 'default' will all return a default state)
   * @default default
   */
  status?: ComponentStatuses;
  /**
   * The aspect ratio of the crop
   * @default 1/1
   */
  aspect?: number;
  /**
   * The function to call to return the image data
   */
  onUpload?: (data: string) => string;
}

/* Render component */
export const InputInmage: React.FC<Props> = ({
  name,
  id,
  status,
  disabled,
  width,
  className,
  aspect = 1 / 1,
  onUpload,
  ...props
}: Props) => {
  const [upImg, setUpImg] = useState<FileReader['result']>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<CompletedCrop>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile: OnSelectFile = (evt) => {
    setIsModalOpen(true);
    setUpImg(undefined);
    setCompletedCrop(undefined);
    setCrop(undefined);
    if (evt.target.files && evt.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(evt.target.files[0]);
    }
  };

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width: elWidth, height: elHeight } = e.currentTarget;
      setCrop(centerAspectCrop(elWidth, elHeight, aspect));
    }
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop as PixelCrop
        );
      }
    },
    100,
    [completedCrop]
  );

  const uploadImage = () => {
    const canvas = previewCanvasRef.current as HTMLCanvasElement;
    const cropObject = completedCrop as CompletedCrop;
    const image = generateFile(canvas, cropObject);
    if (onUpload) {
      onUpload(image);
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className={`
      ${styles['wrapper']}
      ${status ? styles[`status-${status || 'default'}`] : '\0'}
      ${disabled ? styles['disabled'] : '\0'}
      ${className ? className : '\0'}
    `}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    >
      <div className={styles['fake-input']}>
        <Icons.Upload width={40} />
        Upload file...
      </div>
      <input
        className={styles['input']}
        id={id || name}
        name={name}
        disabled={disabled}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        {...props}
      />
      <Modal
        className={styles['modal']}
        isOpen={isModalOpen}
        setIsOpen={() => setIsModalOpen(false)}
        onClose={() => {
          setUpImg(undefined);
        }}
      >
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c as CompletedCrop)}
          aspect={aspect}
        >
          <img
            className={styles['image-preview']}
            ref={imgRef as React.RefObject<HTMLImageElement>}
            src={upImg as string}
            onLoad={onLoad}
          />
        </ReactCrop>
        <div className={styles['bottom']}>
          <canvas ref={previewCanvasRef} className={styles['canvas-preview']} />
          <Button
            label="Finish and upload"
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={uploadImage}
          />
        </div>
      </Modal>
    </div>
  );
};

InputInmage.displayName = 'InputInmage';

export default InputInmage;
