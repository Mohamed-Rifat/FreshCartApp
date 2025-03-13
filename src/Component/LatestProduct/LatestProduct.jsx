import CategoriesSlider from '../CategorySlider/CategorySlider';
import Products from '../../Pages/Products/Products';
import Brandes from '../Brands/Brands';

export default function LatestProduct() {
  return (
    <div className="cursor-pointer">
      <CategoriesSlider />
      <Products/>
      <Brandes />
    </div>
  );
}