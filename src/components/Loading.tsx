function Loading() {
    return (
      <div className="w-full h-lvh flex justify-center items-center p-20 bg-zinc-100">
        <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
          <div className="w-1/6 lg:w-1/12 aspect-square grid grid-cols-3 gap-1 loader">
            <span className="w-full h-full bg-gray-500"></span>
            <span className="w-full h-full bg-gray-500"></span>
            <span className="w-full h-full bg-gray-500"></span>
            <span className="w-full h-full bg-gray-500"></span>
            <span className="w-full h-full bg-gray-500"></span>
            <span className="w-full h-full bg-gray-500"></span>
          </div>
        </div>
      </div>
    );
  }
  
  export default Loading;
  