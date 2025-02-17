import { useEffect, useState } from "react";

type Image = {
  src: string;
};

type ResizedImage = {
  src: string;
  srcSmall: string;
  srcMedium: string;
  srcLarge: string;
  width: number;
  height: number;
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

export default function ImageGrid({
  images,
  columns = 3,
  mobileColumns = 1,
}: ImageGridProps) {
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([]);
  const [columnsData, setColumnsData] = useState<ColumnData[]>([]);
  const [currentColumns, setCurrentColumns] = useState<number>(columns);

  // Adjust column count based on screen size
  useEffect(() => {
    const updateColumns = () => {
      setCurrentColumns(window.innerWidth < 768 ? mobileColumns : columns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columns, mobileColumns]);

  // Resize images and create srcset
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        images.map(
          (img) =>
            new Promise<ResizedImage>((resolve) => {
              const image = new Image();
              image.src = img.src;
              image.onload = () => {
                const aspectRatio = image.naturalHeight / image.naturalWidth;
                const maxWidth = 200;

                resolve({
                  src: img.src,
                  srcSmall: `${img.src}?w=400`,
                  srcMedium: `${img.src}?w=800`,
                  srcLarge: `${img.src}?w=1200`,
                  width: maxWidth,
                  height: Math.round(maxWidth * aspectRatio),
                });
              };
            })
        )
      );
      setResizedImages(loadedImages);
    };

    loadImages();
  }, [images]);

  // Distribute images into columns
  useEffect(() => {
    if (resizedImages.length === 0) return;

    const cols: ColumnData[] = Array.from({ length: currentColumns }, () => ({
      height: 0,
      images: [],
    }));

    resizedImages.forEach((img) => {
      const column = cols.reduce(
        (minCol, col) => (col.height < minCol.height ? col : minCol),
        cols[0]
      );
      column.images.push(img);
      column.height += img.height;
    });

    setColumnsData(cols);
  }, [resizedImages, currentColumns]);

  return (
    <div style={{ display: "flex", gap: 8 }}>
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
            <img
              key={idx}
              src={img.src}
              srcSet={`${img.srcSmall} 400w, ${img.srcMedium} 800w, ${img.srcLarge} 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.3vw"
              style={{
                width: "100%",
                height: "auto",
                animation: "fadeIn 0.5s ease-out forwards",
              }}
              alt="grid-img"
              loading="lazy"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
