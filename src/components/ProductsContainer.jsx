import { useLoaderData } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { viewLayout } from '../utils/data';

const ProductsContainer = () => {
  const { grid, list } = viewLayout;
  const [layout, setLayout] = useState(grid);
  const { meta } = useLoaderData();
  const { total, page, pageCount } = meta.pagination;
  const totalResults = `${total} product${total > 1 ? 's' : ''}`;

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`;
  };

  return (
    <>
      {/* HEADER */}
      <div className="mt-8 flex justify-between items-center border-b border-base-300 pb-5">
        <h4 className="font-medium">{totalResults}</h4>
        <div className="flex gap-x-2">
          <button
            onClick={() => setLayout(grid)}
            className={setActiveStyles(grid)}
          >
            <BsFillGridFill />
          </button>
          <button
            onClick={() => setLayout(list)}
            className={setActiveStyles(list)}
          >
            <BsList />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {total === 0 ? (
          <h5 className="text-2xl">
            Sorry, no products matched your search...
          </h5>
        ) : layout === grid ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
