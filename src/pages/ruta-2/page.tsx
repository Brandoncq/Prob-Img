import GridImg from "../../components/LazyGridImg"
type ImageLazy = {
    src: string;
    alt: string;
  };
type ImagePageLzyProps = {
    images: ImageLazy[];
};
function ImagePageLazy({images}: ImagePageLzyProps) { 
  return (
    <div className='w-full'>
        <div className='w-full flex flex-col h-lvh justify-center items-center p-10 bg-[url(/tinified/bg.jpg)] bg-no-repeat bg-cover bg-center'>
            <p>  What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div> 
        <div className='w-full p-2'>
            <GridImg images={images} columns={4} mobileColumns={2}/>   
        </div>
    </div>
  )
}

export default ImagePageLazy