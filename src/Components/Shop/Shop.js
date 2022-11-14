import {Routes,Route} from 'react-router-dom'
import CategoriesPreview from '../../routes/categoriesPreview.js/categoriesPreview';
import Category from '../../routes/category/category'
import "./shop.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={<Category/>}/>

    </Routes>
  );
};
export default Shop;
