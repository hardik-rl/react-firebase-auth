import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const NotFound = ({customClass}) => {
  const ref = useRef();

  useEffect(() => {

    setTimeout(() => {
      if(ref.current)
      {
        ref.current.classList.remove('hidden');
      }
    }, 500);

  }, []);

  return (
    <div className="hidden" ref={ref}>
      <div
        className={`flex
        items-center
        justify-center
        w-screen
        h-screen ${customClass}`}
        >
        <div className="px-40 py-20 bg-white rounded-md shadow-xl maxMd:px-10 mx-12">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-steelblue text-9xl maxMd:text-3xl">404</h1>
            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Page not found
            </h6>
            <p className="mb-8 text-center text-gray-500 md:text-lg">The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="btn btn-primary inline-block btnNotFound">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
