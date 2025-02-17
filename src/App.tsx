import { Suspense,lazy } from 'react';
import { Routes, Route } from "react-router";
import Loading from './components/Loading';
const ImagePageLazy = lazy(()=> import("./pages/ruta-1/page"))
const ImagePageLazyLoading = lazy(()=>import("./pages/ruta-2/page"))
const images = Array.from({ length: 18 }, (_, i) => ({
  src: `/tinified/img-${i + 1}.jpg`,
  alt: "img-"+i
}));

function App() {
  return (
    <Suspense fallback={<Loading/>}>   

      <Routes>
        <Route index path="/" element={<ImagePageLazy images={images} />} />
        <Route index path="/Lazy" element={<ImagePageLazyLoading images={images} />} />
      </Routes>
    </Suspense>
  )
}

export default App
