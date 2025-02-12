import React, { useState, useEffect } from "react";
import slider1 from '../../assets/Images/slider-image-1.jpeg';
import slider2 from '../../assets/Images/slider-image-2.jpeg';
import slider3 from '../../assets/Images/slider-image-3.jpeg';
import { TbArrowRightDashed } from "react-icons/tb";
import { TbArrowNarrowLeftDashed } from "react-icons/tb";

const ImageSlider = () => {
  const [mainImage, setMainImage] = useState(slider1);
  const images = [slider1, slider2, slider3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false); 

  const changeImage = (image, index) => {
    setIsChanging(true); 
    setTimeout(() => {
      setMainImage(image);
      setCurrentIndex(index);
      setIsChanging(false); 
    }, 300); 
  };

  const nextImage = () => {
    setIsChanging(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setMainImage(images[nextIndex]);
      setCurrentIndex(nextIndex);
      setIsChanging(false);
    }, 300);
  };

  const prevImage = () => {
    setIsChanging(true);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setMainImage(images[prevIndex]);
      setCurrentIndex(prevIndex);
      setIsChanging(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  return (
    <div className="w-4/5 mx-auto p-4">
      <div className="hidden lg:flex items-start space-x-4 h-[400px]">
        <div className="w-2/3 h-full relative overflow-hidden">
          <img
            src={mainImage}
            alt="Main"
            className={`w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ${
              isChanging ? "opacity-0 transform translate-x-full" : "opacity-100 transform translate-x-0"
            }`}
          />
        </div>

        <div className="w-1/3 h-full flex flex-col space-y-2">
          {images
            .filter((image) => image !== mainImage)
            .map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => changeImage(image, images.indexOf(image))}
                className="w-full h-[calc(50%-0.25rem)] object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
        </div>
      </div>

      <div className="lg:hidden h-[300px] relative overflow-hidden">
        <img
          src={mainImage}
          alt="Main"
          className={`w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ${
            isChanging ? "opacity-0 transform translate-x-full" : "opacity-100 transform translate-x-0"
          }`}
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 hover:bg-slate-400 transition-all"
        >
          <TbArrowNarrowLeftDashed />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 hover:bg-slate-400 transition-all"
        >
          <TbArrowRightDashed />
        </button>
      </div>

      <div className="hidden lg:flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              changeImage(images[index], index);
            }}
            className={`w-5 h-1 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-slate-400" : "bg-gray-200"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;