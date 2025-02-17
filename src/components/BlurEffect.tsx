import React, { useEffect, useRef } from 'react';
import { decode } from 'blurhash';

type BlurhashCanvasProps = {
  hash: string;
  width: number;
  height: number;
};

const BlurhashCanvas: React.FC<BlurhashCanvasProps> = ({ hash, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const pixels = decode(hash, width, height);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [hash, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BlurhashCanvas;
