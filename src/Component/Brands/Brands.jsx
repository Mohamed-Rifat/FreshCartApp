import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [isPaused, setIsPaused] = useState(false); 
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 2;

  const getBrands = async () => {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollSlider = () => {
      if (!isPaused) {
        slider.scrollLeft += scrollSpeed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scrollSlider);
    };

    animationRef.current = requestAnimationFrame(scrollSlider);

    return () => cancelAnimationFrame(animationRef.current);
  }, [brands, isPaused]); 

  return (
    <div className="w-4/5 mx-auto my-16 overflow-hidden">
      <h2 className="capitalize text-3xl font-bold mb-6 flex gap-5 items-center justify-center">
        <p>Shop Popular Brands</p>
      </h2>
      
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-hidden whitespace-nowrap"
        onMouseEnter={() => setIsPaused(true)}  
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex-shrink-0 mx-5">
            <img src={brand.image} className="h-20 object-contain" alt={brand.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
