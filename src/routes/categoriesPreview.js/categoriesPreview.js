import {  Fragment } from 'react';

// import { CategoriesContext } from '../../contexts/categoriesContext';
import CategoryPreview from '../../Components/category-preview/categoryPreview';

import { selectCategory } from '../../store/categories/categories.selector';
import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
  const categoriesMap=useSelector(selectCategory)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;