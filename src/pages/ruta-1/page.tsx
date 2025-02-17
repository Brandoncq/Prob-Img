import GridImg from "../../components/GridImg";
import Carousel from "../../components/Carrousel";
import Card from "../../components/Card";
type Image = {
  src: string;
};
type ImagePageProps = {
  images: Image[];
};
function ImagePage({ images }: ImagePageProps) {
  const carouselImages = images.slice(10, 18); // Imágenes del 11 al 18
  const gridImages = images.slice(0, 6); // Imágenes del 1 al 10
  return (
    <Card title="INGRESE">
      <div className="w-full">
        <div className="w-full flex flex-col h-lvh justify-center items-center p-10 bg-[url(/tinified/bg.jpg)] bg-no-repeat bg-cover bg-center">
          <div className="w-full lg:w-1/2">
            <p className="text-sm lg:text-lg font-light text-center">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="w-full p-2 h-lvh flex justify-center items-center">
          <div className="w-5/6 h-5/6">
            <Carousel images={carouselImages} />
          </div>
        </div>
        <div className="w-full flex flex-col h-lvh justify-center items-center p-10 bg-[url(/tinified/bg-1.jpg)] bg-no-repeat bg-cover bg-center">
          <div className="w-full lg:w-1/2">
            <p className="text-sm lg:text-lg font-light text-center">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="w-full p-2">
          <GridImg images={gridImages} columns={4} mobileColumns={2} />
        </div>
      </div>
    </Card>
  );
}

export default ImagePage;
