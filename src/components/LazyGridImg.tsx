import { useEffect, useState, useRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
type Image = {
  src: string;
  alt: string;
};

type ResizedImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type ColumnData = {
  height: number;
  images: ResizedImage[];
};

type ImageGridProps = {
  images: Image[];
  columns?: number;
  mobileColumns?: number;
};

export default function ImageGrid({ images, columns = 3, mobileColumns = 1 }: ImageGridProps) {
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([]);
  const [columnsData, setColumnsData] = useState<ColumnData[]>([]);
  const [currentColumns, setCurrentColumns] = useState<number>(columns);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateColumns = () => {
      setCurrentColumns(window.innerWidth < 768 ? mobileColumns : columns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columns, mobileColumns]);

  useEffect(() => {
    const resizeImages = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxWidth = containerWidth / currentColumns;
        const loadedImages: ResizedImage[] = [];

        images.forEach((img) => {
          const image = new Image();
          image.src = img.src;
          image.onload = () => {
            const aspectRatio = image.naturalHeight / image.naturalWidth;
            loadedImages.push({
              src: img.src,
              width: maxWidth,
              height: Math.round(maxWidth * aspectRatio),
              alt: img.alt,
            });
            if (loadedImages.length === images.length) {
              setResizedImages([...loadedImages]);
            }
          };
        });
      }
    };

    resizeImages();
    window.addEventListener("resize", resizeImages);
    return () => window.removeEventListener("resize", resizeImages);
  }, [images, currentColumns]);

  useEffect(() => {
    if (resizedImages.length === 0) return;
    const cols: ColumnData[] = Array.from({ length: currentColumns }, () => ({
      height: 0,
      images: [],
    }));

    resizedImages.forEach((img) => {
      const column = cols.reduce((minCol, col) => (col.height < minCol.height ? col : minCol), cols[0]);
      column.images.push(img);
      column.height += img.height;
    });

    setColumnsData(cols);
  }, [resizedImages, currentColumns]);

  return (
    <div ref={containerRef} style={{ display: "flex", gap: 8,overflow: "hidden",width: "100%" }}>
      {columnsData.map((col, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: `${100 / currentColumns}%`,
          }}
        >
          {col.images.map((img, idx) => (
            <LazyLoadImage
              key={idx}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              style={{
                width: "100%",
                height: "auto",
                animation: "fadeIn 0.5s ease-out forwards",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
