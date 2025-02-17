import { useState } from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  const [isCardVisible, setIsCardVisible] = useState(true);

  return (
    <>
      {isCardVisible ? (
        <div className="w-full h-lvh flex justify-center items-center">
          <div className="w-1/2 h-1/2 border border-gray-300 p-10 rounded-lg transition-opacity duration-500 ease-out flex flex-col justify-center items-center bg-[url(/tinified/bg.jpg)]">
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <button
              onClick={() => setIsCardVisible(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Ingresar
            </button>
          </div>
        </div>
      ) : null}

      <div
        className={`transition-opacity duration-500 ${
          isCardVisible ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
        }`}
      >
        {children}
      </div>
    </>
  );
}
