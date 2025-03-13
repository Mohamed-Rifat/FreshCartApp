import { useEffect, useState, useRef } from "react";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [isPaused, setIsPaused] = useState(false); 
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 2;

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
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
  }, [categories, isPaused]); 

  return (
    <div className="w-4/5 mx-auto my-4 overflow-hidden">
      <h2 className="capitalize text-3xl font-bold mb-6 flex gap-5 items-center justify-center">
        <p>Categories</p>
      </h2>
      
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-hidden whitespace-nowrap"
        onMouseEnter={() => setIsPaused(true)}  
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...categories, ...categories].map((category, index) => (
          <div key={index} className="flex-shrink-0 mx-5">
            <img src={category.image} className="w-auto h-56 max-w-full max-h-full object-cover" alt={category.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
