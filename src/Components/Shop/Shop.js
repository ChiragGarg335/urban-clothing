import {Routes,Route} from 'react-router-dom'
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase';
import { setCategoriesMap } from '../../store/categories/categories.action';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../../routes/categoriesPreview.js/categoriesPreview';
import Category from '../../routes/category/category'
import "./shop.scss";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategory=async()=>{
       const catergoryMap=await getCategoriesAndDocuments()
       dispatch(setCategoriesMap(catergoryMap))
    }
    getCategory();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={<Category/>}/>

    </Routes>
  );
};
export default Shop;
