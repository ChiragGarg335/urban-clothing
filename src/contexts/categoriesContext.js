import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase";
// import {addCollectionAndDocuments} from "../utils/firebase/firebase";
// import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoryProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(()=>{
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // },[])
  useEffect(() => {
    const getCategory=async()=>{
       const catergoryMap=await getCategoriesAndDocuments()
       setCategoriesMap(catergoryMap)
    }
    getCategory();
  }, []);
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
